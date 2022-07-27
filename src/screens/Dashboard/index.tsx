import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { HightlightCard } from "../../components/HightlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Container,
    Header,
    UserWrapper,
    InfoUser,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    LogoutButton,
    HightlightCards,
    Transcsations,
    Title,
    TransactionList,
    LoadContainer,
} from "./styles";

/* nava interface com as TransactionCardProps mais o id 
vamos precisar da tipagem DataListProps para armazenar
os estados dos cartões*/
export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HightlightDataProps {
    amount: string;
    lastTransaction: string;
}

interface HightlightData {
    entries: HightlightDataProps;
    expensives: HightlightDataProps;
    total: HightlightDataProps;
}

export function Dashboard() {
    /* verificando todas as propriedades do TransactionListProps mais id */
    /*  const teste : DataListProps;
    teste.  */

    {/*passando o const data primeiramente como um objeto
ao acrescenta o TransactionList passamos como um array e
aumentamos o número de objeto só para ve a rolagem depois
vamos fatorar*/}

    /* meu data também é um array de DataListProps 
    DADOS FIXOS*/
    /* const data: DataListProps[] = [
        {   
            id: "01",
            type: "positive",
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date: "13/04/2020"
        },

        {
            id: "02",
            type: "negative",
            title: "Hamburgueria Pizzy",
            amount: "R$ 59,00",
            category: {
                name: 'Alimentação',
                icon: 'coffee',
            },
            date: "10/04/2020"
        },

        {
            id: "03",
            type: "negative",
            title: "Aluguel do apartamento",
            amount: "R$ 1.200,00",
            category: {
                name: 'Casa',
                icon: 'shopping-bag',
            },
            date: "10/04/2020"
        },

    ];
 */

    const theme = useTheme();

    /* função que verifica as ultimas transação de entrada e saída */
    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {
        /* últimas transações,
       filter so das transações de entradas
       const lastTransactionEntries pego mminhas transações e faço o filter
       e verifico a onde o type e positivo e o map me devolve só as datas formato
       de texto preciso converter para datas new Date() e dessa data quero
       o getTime(um número que representa a data) para descobrir qual é o mais
       mais recente verifico qual é o maior e depois faço o processo contrário */

        const lastTransaction = new Date (
            Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())));

        /* retorno da data formatada */
                       /* somente o dia get(Date) */                                    /* mês por extenso */
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pr-Br', {month:"long"})} `;
    }

    /* estado para evitar que a interface espere o carregamento dos dados para abrir
    true: esta carregando(bolinha) e chama o ActivityIndicator */
    const [isLoading, setIsLoadin] = useState(true);

    /* estado das transações, tipagem com DataListProps
    dizendo que ele é um vetor */
    const [transactions, setTransections] = useState<DataListProps[]>([]);

    /* estados cartões de entrada, saída e total,
    começa com vazio desse tipo HightlightData */
    const [hightlightData, setHightlightData] = useState<HightlightData>({} as HightlightData);

    /* função que carrega as transações, função está de fora do useEffect, para 
   facilitar uma fatoração futura */
    async function LoadTransaction() {
        /* constante que armazena o nome da nossa colection */
        const dataKey = "@gofinances:transactions";
        /* pegando todos os itens na nossa coleção */
        const response = await AsyncStorage.getItem(dataKey);
        /* passando para um objeto JSON */
        const transaction = response ? JSON.parse(response) : [];

        /* cartões de entrada, saída e total */
        /* vou verificar se os item do meu map e positive ou negative */

        let entriesTotal = 0;
        let expensiveTotal = 0;

        /* fazendo um map para percorrer nossas transações,
        e formatando, pora ve os cartões desformatado, setData(transaction),
        e o meu transactionFormatted salvo no meu estado setData(transactionFormatted)
        vou tizer que o retorno tem um tipo DataListProps[],
        vou percorrer cada item fazendo a tipagem, cada item é um DataListProps,
        retornando um array de DataListProps */

        const transactionFormatted: DataListProps[] = transaction
            .map((item: DataListProps) => {
                /* se o tipo for positive, pego o que tem no entriesTotal somo
                com o amount e armazeno no entriesTotal */
                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount)
                } else {
                    expensiveTotal += Number(item.amount)
                }

                /* faço a tipagem do amount passando para um número e passando o local como string,
                e passando um objeto com a moeda e tipo*/
                const amount = Number(item.amount).toLocaleString('pt-Br', {
                    /* tipo moeda */
                    style: 'currency',
                    /* do tipo brasileira */
                    currency: 'BRL'
                });
                /* formatando a date,
                o Intl não vem instalado no Android, 
                precisa adicionar yarn add intl,
                e chamar no app.tsx
                import "intl";
                import "intl/locale-data/jsonp/pt-BR"; */

                const date = Intl.DateTimeFormat('pt-Br', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                /* retorno do objeto formatadinho */
                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }
            });

        /* atualização setTransactios */
        setTransections(transactionFormatted);
        //console.log(transactionFormatted)

        /* últimas transações de entrada */
        const lastTransactionEntries = getLastTransactionDate(transaction, 'positive');

        /* últimas transações de entrada */
        const lastTransactionExpensives = getLastTransactionDate(transaction, 'negative');

         /* intervalo */
         const totalInterval = `01 a ${lastTransactionExpensives}`;

        /* cálculo do total */
        const total = entriesTotal - expensiveTotal;

        /* atualização setHightlightData */
        setHightlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-Br', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-Br', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-Br', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        });

        //console.log(transactionFormatted)

        /* termina de carregar os dados */
        setIsLoadin(false)
    }


    /* carregamento dos dados, array de dependência vazio
    pois vou carregar a lista uma única vez*/
    useEffect(() => {
        LoadTransaction();
        /* limpando todos os itens da lista */
        //const dataKey = "@gofinances:transactions";
        //AsyncStorage.removeItem(dataKey);
    }, []);

    /* reset na interface */
    useFocusEffect(useCallback(() => {
        LoadTransaction();
    }, []));

    /* para usar o estado {<> </>} depois do ActivityIndicator */
    return (
        <Container>
            {
                /* se isLoading for verdadeira mostra o ActivityIndicator
                caso o contrário o resto */
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadContainer> :

                    <>
                        <Header>
                            <UserWrapper>
                                <InfoUser>
                                    <Photo source={{
                                        uri: 'https://avatars.githubusercontent.com/u/40746979?v=4'
                                    }} />
                                    <User>
                                        <UserGreeting>Olá</UserGreeting>
                                        <UserName>Ferreira</UserName>
                                    </User>
                                </InfoUser>
                                {/* função onPress na chama nada */}
                                <LogoutButton onPress={() => { }}>
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>

                        <HightlightCards>
                            <HightlightCard
                                type='up'
                                title="Entradas"
                                amount={hightlightData.entries.amount}
                                lastTransaction={hightlightData.entries.lastTransaction}
                            />
                            <HightlightCard
                                type='down'
                                title="Saídas"
                                amount={hightlightData.expensives.amount}
                                lastTransaction={hightlightData.expensives.lastTransaction}
                            />
                            <HightlightCard
                                type='total'
                                title="Total"
                                amount={hightlightData.total.amount}
                                lastTransaction={hightlightData.total.lastTransaction}
                            />
                        </HightlightCards>

                        <Transcsations>
                            <Title>Listagem</Title>

                {/* precisamos ipar a listagem se voce olhar data até que consegue
                pegar as propeiedades mas o item da desconhecido,
                preciamos passar também um id para nossa lista keyextractor
                acrescentamos provisoriamente um id na nossa lista */}

                            <TransactionList
                                data={transactions}
                                /* extraindo o id */
                                keyExtractor={item => item.id}
                                /* desistrutura o item e passa p TransactionCard */
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />
                            {/*  mostra o primeiro objeto da coleção
                <TransactionCard data={data[0]} /> */}
                        </Transcsations>

                    </>
            }
        </Container>
    )
}