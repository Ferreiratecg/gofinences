import React from 'react';
import { HightLightCard } from '../../components/HightLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
    Cantainer,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HightLightCards,
    Transactions,
    Title,
    TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string
}

export function Dashboard() {
    //const teste : DataListProps;
    //teste.date

    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: "14/06/2022"
        },
        {
            id: '2',
            type: 'negative',
            title: "Hamburger pizza",
            amount: "R$ 59,00",
            category: {
                name: 'Alimentos',
                icon: 'coffee'
            },
            date: "10/06/2022"
        },
        {
            id: '3',
            type: 'negative',
            title: "Aluguel do apartamento",
            amount: "R$ 1.200,00",
            category: {
                name: 'Casa',
                icon: 'shopping-bag'
            },
            date: "10/06/2022"
        },
    ];
    // showsVerticalScrollIndicator={false} retira a barra lateral vertical
    //Você pode converter o item.id para string usando o toString() dessa forma:
    //keyExtractor={item => item.id.toString()}

    return (
        <Cantainer>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/40746979?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Ferreira</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HightLightCards>
                <HightLightCard
                    type='up'
                    title='Entrada'
                    amount='R$ 17.400,00'
                    lastTrasaction='Última transação 13 de abril'
                />
                <HightLightCard
                    type='down'
                    title='Saídas'
                    amount='R$ 1.259,00'
                    lastTrasaction='Última saída 03 de abril'
                />
                <HightLightCard title='Total'
                    type='total'
                    amount='R$ 16.141,00'
                    lastTrasaction='01 à 16 de abril' />
            </HightLightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}

                />

            </Transactions>
        </Cantainer>
    );
}