import React, { useState, useEffect } from "react";
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native"
import { useForm } from "react-hook-form";
/* redirecionamento */
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid"

/* import tudo que está dentro do yup com Yup */
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from "./styles"



/* tipogem do form, os mesmo name do form */
interface FormData {
    name: string;
    amount: number;
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required("Nome é obrigatório"),

    amount: Yup
        .number()
        .typeError("Informe o valor numérico")
        .positive("Valor não pode ser negativo")

})

export function Register() {
    /* estado que armazena qual botão esta selecionado
   ele começa com uma string vazio nem um botão selecionado */
    const [transactionType, setTransactionType] = useState('');
    //console.log( transactionType );

    /* estado que contrala se o modal está aberto ou fechado) */
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    //console.log(categoryModalOpen)

    /* estados inicial das categorias, passando um objeto com suas proprieddes */
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    /* inicialização do useNavigation */
    const navigation = useNavigation();

    /* desistruturizando o useForm */
    const {
        control,
        handleSubmit,
        /* reseta os campo do react-hook-form */
        reset,
        /* captura os erros */
        formState: { errors }
    } = useForm({
        /* faz com que o handleSubmit siga o padrão de validação conforme o schema */
        resolver: yupResolver(schema)
    });

    /* a função espera receber um parâmetro do tipo string
    já posso fazer a tipagem informando que vai ser um up ou um dowm,
    modificando o tipo para: 'positive' | 'negative' */
    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    /* função que abre  o modal */
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    /* função que fecha  o modal */
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    /* recebe um form */
    async function handleRegister(form: FormData) {
        /* validação */
        if (!transactionType)
            return Alert.alert("Selecione o tipo da trasação");

        if (category.key === 'category')
            return Alert.alert("Selecione a categoria");

        const newTransaction = {
            /* id gerado automaticamente formato string */
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        /* estrutura de tentativa */
        try {
            /* constante que armazena o nome da nossa colection */
            const dataKey = "@gofinances:transactions"

            /* recuperando os dados do asyncstorage e armaz em uma const */
            const data = await AsyncStorage.getItem(dataKey);

            /* convertendo os dados para objeto */
            const currentData = data ? JSON.parse(data) : [];

            /* const com os dados no formato de vetor(mais de uma transação) */
            /* todos os dados salvo mais a nova transação,
             salvando dataFormatted no final*/
            const dataFormatted = [...currentData, newTransaction];

            /* salvando os dados, o asyncstorage leva um tempinho para gravar os dados,
          usamos o await para ele aguardar de salvar no dispositivo do usuário,
          o setItem espera dois parâmetro a key e dados na forma de string */
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            /* resseta o form, recurso do react hook form */
            reset();
            /* reseta tipo de trasação, estado inicial */
            setTransactionType();
            /* reset a categoria, stado inicial */
            setCategory({
                key: 'category',
                name: 'Categoria',
            });
            /* redirecionamento */
            navigation.navigate("Listagem");

        } catch (error) {
            /* para o dev */
            console.log(error);

            /* para o usuário */
            Alert.alert("Não foi possível salvar")
        }
    }

    /* lendo os dados que estão gravado, useEffect => usado no ato de carregamento
     da interface tem como parâmetro uma função e array de dependência,
    por padrão não podemos passar para useEffect o Async, hackzinho: criar uma função */
    // useEffect(() => {
    /* le os dados */
    //   async function loadData() {
    //     const data = await AsyncStorage.getItem(dataKey);
    /* processo contrário de texto para objeto, exclamação recurso type script
    que indica que pode confiar que sempre vai ter dados */
    //      console.log(JSON.parse(data!))
    //}
    //loadData();

    /* remove os dados */
    /*  async function removeAll(){
      await AsyncStorage.removeItem(dataKey);
     }
     removeAll(); */
    //}, [])

    return (
        /* fecha o teclado ao clicar em qualquer região */
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            /* primeira letra da frase maiúscula */
                            autoCapitalize="sentences"
                            autoCorrect={false}

                            /* propriedade error passada pelo o componente verifica
                            se existir o errors.name então exibe a mensagem passada pelo o Yup */
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            /* teclado numerico */
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Entrada"

                                onPress={() => handleTransactionsTypeSelect('positive')}
                                isActive={transactionType === 'positive'}

                            />
                            <TransactionTypeButton
                                type="down"
                                title="Saída"

                                onPress={() => handleTransactionsTypeSelect('negative')}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionTypes>

                        <CategorySelectButton
                            /* mostra a categoria selecionada */
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button
                        title="Enviar"
                        /* quando clicar chama o handleSubmit que
                        transfere os valores dos input p o handleRegister */
                        onPress={handleSubmit(handleRegister)}
                    />

                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>

            </Container >
        </TouchableWithoutFeedback>
    )
}