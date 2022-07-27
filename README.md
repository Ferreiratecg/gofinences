Projeto gofinences gerenciamento financeiro
#### Instalação do expo-cli
1. Exe terminal admin
npm install -g expo-cli

### Criando o projeto
1. Na pasta do projeto exec:
expo init nomeprojeto
2. digite code . para abrir vsc

### Adicionando o typeScript no projeto
1. yarn add -D typescript @types/react @types/react-native

2. criar um arquivo tsconfig.json adicionar:
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react-native",
    "lib": ["es2017"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}

### Mudar a extensão do arquivo App.ts para App.tsx

### Criar uma pasta src 
### Criar pasta components 

### Rodando o projeto primeira vez
1. Create avd emulator android
2. logar com avd na sua conta google para ele poder instalar o expo go
3. exec: npx expo start
4. digite a => android 
          d => navegador
          r => reload app
tenha paciência, expo go demora

###React-native-gesture-handler
npm install react-native-gesture-handler@1.10.3

expo r -c limpa o cache do expo
expo doctor --fix-dependencies instala as depencias compatível

### Para usar uma versão compatível do react-native-gesture-handler com o expo exec:
expo install react-native-gesture-handler
1. envolver o app.tsx com
<GestureHandlerRootView = { { flex: 1} }>
    <View style={styles.container}>
      <Wellcome title='Hello WorldW!' />
    </View>
</GestureHandlerRootView>

GORJETA
Se você estiver usando o manipulador de gestos em sua biblioteca de componentes, convém envolver o código de sua biblioteca no componente GestureHandlerRootView. Isso evitará configuração extra para o usuário.

no Android: #
Não há etapas adicionais necessárias, desde que seu aplicativo esteja configurado para compilar com o Fabric – isso normalmente é configurado definindo newArchEnabled=true no gradle.propertiesarquivo em seu projeto.

### Instalação styled-components biblioteca de estilização
 yarn add styled-components
1. Instalação da tipagem do styled-components
npm install --save @types/styled-components @types/styled-components-react-native 

#### REACT-NATIVE-GESTURE-HANDLER
index.tsx
import React from "react";

import { 
    Container,
     LogoutButton, Icon, Title } from "./styles";
import { Button } from "../../components/Button";

export function Dashboard() {
    return (
        <Container>
            <Title />
            <LogoutButton onPress={() => { }}>
                <Icon name="power" />
            </LogoutButton>

            <Button
             title="Enviar"
           
            />
        </Container>
    )
}

styles.ts
import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
width: 100%;
flex: 1;
justify-content: center;
align-items: center;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
color: blue;
font-size: 24px;
`;

export const Title = styled.Text`
font-size: 18px;

margin-top: 16px;
`;

app.tsx
import 'react-native-gesture-handler' ; 
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Wellcome } from "./src/components/Wellcome"
import { Dashboard } from "./src/screens/Dashboard"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Dashboard title='Hello WorldW!' />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

###### FINAL REACT-NATIVE-GESTURE-HANDLER

### Themas Globais 
Se no futuro mudarmos uma cor ela é atualizada em todos os lugares
1. cores
2. fontes

3. Definir a base de cores

4. Criar uma pasta no src blobal/styles/theme.ts => vai ficas nosso thema, posso usar em qualquer parte da nossa aplicação

5. Convert hex em rgba https://cssgenerator.org/rgba-and-hex-color-generator.html

### Usando nosoo theme
1. No app.tsx import { ThemeProvider } from "styled-components"; 
2. import theme from "./src/global/styles/theme"
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
o ThemeProvider é um contexto que tem uma propriedade theme que disponibilisa o thema na nossa aplicação para toda aplicação

### Usando o nosso theme no styles.ts
1. pegando através da propridades trazemos todas as cores do nosso theme
background-color: ${(props) => props.theme.color.primary};

2. Forma desestruturizada pegando so a cor primary(usamos essa)
background-color: ${({ theme }) => theme.color.primary};
3. Subscrevendo o thema do styled-components com o tema que a gente criou,issso ajuda a identificar as props do no tema.
4. Criar o arquivo styled.d.ts dentro global/styled:
styled.d.ts arquivos com essas extensões seve para sobrescrever um arquivo do styled-components(tipagem)
5.Abra o arquivo styled.d.ts
5. import 'styled-components'; (importação direta) e o nosso theme
import theme from "./theme";
 
import 'styled-components';
import theme from "./theme";

declare module 'styled-components' {
   type ThemeType = typeof theme

   export interface DefaultTheme extends ThemeType{}
}

declaro um módulo com as propriedades do styled-components(declare module 'styled-components')

crio um tipo type ThemeType que será igual a nosso theme
o typeof copia um tipo de objeto(nosso thema) e passa p o ThemeType

em seguida exportamos como DefaultTheme extendendo nossa app

### Incluindo fontes no nosso thema
1. Instalar o expo-font, permite carregar fontes da web e usá-las em componentes React Native
 expo install expo-font @expo-google-fonts/poppins nosso projeto usa a popins

2. Configurar no app.tsx os tipos de poppins que vamos usar
3. import { 
  useFonts, // hooks que carrega as fontes
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
 } from "@expo-google-fonts/poppins";

 antes de carregar o aplicativo precisamos garante que essas
 fontes esteja disponíveis no celular do usuário o carregamento pode levar um tempinha.
 antes do return passamos o fontsLoad que vem do hooks useFonts, enquanto a fonte esta
 carregando seguro a tela de splash

 para segura a tela de splash precisamos do components do expo loading
 expo install expo-app-loading enquanto a fonte não carregar ele nãoexibi o app

 fazer o import do loading no app.tsx

 ### expo loading deprecare
 usando o SplashScreen no lugar do expoLoading
  O SplashScreen módulo diz à tela inicial para permanecer visível até que seja explicitamente informado para ocultar
1. instalando splashscreen
expo install expo-splash-screen

2.SplashScreen.preventAutoHideAsync()
Este método faz com que a tela inicial nativa permaneça visível até que SplashScreen.hideAsync()seja chamada.

 Isso deve ser chamado antes que qualquer hierarquia de exibição controlada pelo ReactNative 

 Uso
Este exemplo mostra como manter a tela inicial visível ao carregar recursos do aplicativo e, em seguida, ocultar a tela inicial quando o aplicativo renderizar algum conteúdo inicial.

 ### Incluindo as fonts no nosso theme
Incluir no arquivo theme.ts as fonts declarada no app.tsx

### Iniciandoa cabeçalho da aplicação
1.0 instalando a biblioteca para trabalhar com proporsãp
yarn add react-native-responsive-fontsize => faz ajuste automático nos vários dispositivo

possuem dois métodos:
RFPercentage arguments: percent: numbe => O tamanho da fonte é calculado como uma porcentagem da altura ( width no modo paisagem) do dispositivo.

RFValue arguments: value: number, standardScreenHeight?: number => O tamanho da fonte é calculado com base em standardScreenHeight e no valor passado

hackzinho: seleciona virgula + ctrl + d várias vezes até selecionar todas as vírgula, apertando o home o texto começa no início

para as bordas posso usar px norma porque não quebra o app

como alalisar margin, padding etcc no figma clica no objeto e passa o mouse

### Estilizando o botão de logaout
1. instalação da biblioteca @expo/vector-icons já vem por padrão do expo
2. usando o Feather import no styles.ts do dashboard
3. u styled-components fnciona com outras biblioteca
4. <LogoutButton onPress={() => {}}> função que não chama nada
5. BoderlessButton do react-native-gesture-handler, cria um efeito de onda ao clicar
   
### Criação dos cartoes de entrada, saida e total
1. são muito semelhantes vamos criar um comonente que serve para os três, modificando
só background, ícones e texto, cartão de destaque pois vai ficar na primeira screen
os cartões vai ter os type=poditive, negative and total, utilizando os style-components
o mesmo cartão muda de acordo com as propriedades passada.
2. dentro da pasta componenes criar nosso componente HightlightCard
hackzinho New file nomedapasta/nomedoarquivo

3. olhando no figma e entendendo a estrutura do cartão
os cartões tem um container que envolve os tres cartões
cada cartão tem: um header(um ícone e saida total), valor e informação da última transação
4. nos icons vamos usar feather
<Incon name="arrow-up-circle" /> seta p cima cartão de entrada
5.import cartão para dashboard.tsx
hackzinho minizar um component enter no final click seta inicio

6. Estilizando os cartões
começando pelo o container, o cartão ocupa um espaço onde veja o outro cartão
a altura sera calculada pelo o conteúdo

margin espaçamento externo
padding interno
testar seu app em dispositivo diferente
o icone muda de cor de acordo com o tipo do cartão entrada(success) saida(alert)
a importancia de usar o thema garantimos que toda aplicação
o entrada e ícone estão um debaixo do outro esse é o padrão flex
com um flex-derection= row um fica ao lado do outro

7. cartões recebendo informações através de propriedades e não fixa
8. lista de rolagem p os cartões
os cartões tem que ficar um ao ladodo outro e por padrão ele coloca um em baixo do outro
usamos a propriedade Horizonta={true} no card, os cartoes invande uma parte do header

#### npm i react-native-iphone-x-helper --save
ajuda a lidar com o header do iphone
1. duas funções verifica o espaçamento do header e bottom, identifca
de é uma aplicação ios ou android

### proprieades styled-components
1. Passando propriedades p o componente(HightlightCard) e passeado nessas propriedade
mudar o estilo, três cartões usando o mesmo componente, que muda as suas
propriedade comforme se styles.

2. Interface tipagem no index do HighrLightCard
interface Props {
    title: string;
    amount: string;
    lastTransaction: string;
}
passando as propriedades pa o componente 
export function HightlightCard({ title, amount, lastTransaction } : Props){
3. mudando as cores do icons up: verde, down: danger, total: branco
passa para styled-component qual é essa propriedade,
propriedade type para dentro do styled-compoments, para a gente mudar
de cor baseado no tipo  {/*Icon recepe a propriedade type, type={type*/}

hackzinho no javascript === analisa conteúdo e tipo   ==  só conteúdo

### Cartões de transações
1. Começando criando um Compomente <Transactions> que envolve toda listagem 
das transações

2. Criando o componente TransactionCard.tsx
olhando no figma vemos que na listagem temos:
2.1 tipo: saida, entrada
2.2 amount: quantia
2.3 categoria: alimentação, salário etc...
2.4 data da trasação

3. precisamos colocar um footer para poder mudar o flex-direction

### Parte de listagem dos cartões
1. Quando é poucos componente podemos usar a ScrollView
no nosso caso vamos usar a FlatList, melhor desempenho

2. Tipagem dos cartões
Começar criando uma insterface no componente

### Tipagem dos cartões de transações(FlatList)
1. Se o cartão vou de saída tem que ficar vermelho com o sinal de menos
2. Se for de entrada verde
3. Usando o estilo de type para fazer essa configuração

### Formulário de navegação TabNavigation
1. Criação da interface de cadastro segunda tela
2. Criando uma nova tela Register
3. Por enquanto não temos nossa navegação vamos fazer
as telas e depois criamos nossa navegação, precisamos chamar nossa tela 
de Register no App.tsx

4. criação do Header
5. criação do formulário, começar criando um componente para os input
cria na posta de componente uma pasta chamada Form e tudo que for do form
coloca nela input, botões etc

6. criando o button enviar
7. criando os botões para o tipo da trasação: entrada e saída
hackzinho: handle é uma função que é disparada depois de um click do usuário

### Criação do botão de seleção de categoria
1. dentro do comonente form criar o componente CategorySelect

### Fazendo um modal
1. quando clicar no componente Categoria, seleciona a categoria
e volta para tela de cadastro.
2. dentro do src criamos a pasta utils onde esta a tabela de categorias.
3. criamos o nova screen chamada de CategorySelect
4. para ve como está ficando passa para app.tsx no lugar do Register
o CategorySelect 

5. Iniciando com as configuração do modal
voltar a tela de registro no app.tsx

6. a idéia é quando eu clicar na categoria abrir nosso modal e quando clicar
em selecionar ele feche.
na screen Register importar do react-native o componente MODAL
#####
Register index.tsx
import React, { useState } from "react";
import { Modal } from "react-native"

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
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

export function Register() {
    

    /* estado que armazena qual botão esta selecionado
    ele começa com uma string vazio nem um botão selecionado */
    const [transactionType, setTransactionType] = useState('');
    //console.log( transactionType );

    /* estados das categorias, passando um objeto com suas proprieddes */
   const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
     });

    /* estado que contrala se o modal está aberto ou fechado
    iniciando a propriedade visible com false(fechado) */
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    /* a função espera receber um parâmetro do tipo string
    já posso fazer a tipagem informando que vai ser um up ou um dowm */
    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        /* passa o tipo para setTransactionType e o mesmo atualiza o o transactionType */
        setTransactionType(type);
    }

    /* função que abre  o modal */
     function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
     }

     /* função que fecha o modal */
     function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
     }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                {/* separa o botão, poder empurrar ele p baixo */}
                <Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />

                    <TransactionTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Entrada"
                            /* quando clicar no botão de entrada chama essa função
                            e as propriedade up */
                            onPress={() => handleTransactionsTypeSelect('up')}

                            /* como saber se o botão está seleciona, passo para isActive
                            a propriedade transactionType que é a propriedade que tem
                            a informação up ou down, retornado falso ou verdadeiro */
                            isActive={transactionType === 'up'}

                        />
                        <TransactionTypeButton
                            type="down"
                            title="Saída"
                            /* quando clicar no botão de saída chama essa função
                            e passa a propriedade down */
                            onPress={() => handleTransactionsTypeSelect('down')}

                            /* se estive selecionado passa true e o down e falso */
                            isActive={transactionType === 'down'}
                        />
                    </TransactionTypes>

                    <CategorySelectButton
                    title={category.name}
                    onPress={handleOpenSelectCategoryModal}
                     />
                </Fields>

                <Button title="Enviar" />
            </Form>

            {/* passando o componente de seleção de categorial para o modal 
            setCategoryModalOpen verifica se o modal está aberto ao não*/}
            <Modal visible={setCategoryModalOpen}>
                {/* passando as propriedades para o CategorySelect */}
                <CategorySelect
                   
                    category={ category }

                    setCategory={setCategory}
                    
                    /* controla o estado do modal */
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>

        </Container >
    )
}

### React Hooks Form
1. Não gera atualizações no estado, ao clicar no botão enviar
envia tudo de uma vez 

2. npm install react-hook-form
usa componentes controlados, precisamos passar um controler, posso usar um
input normal e um input controlado
 
### Validando o formulário

### Navegalçao
1. Instalação do React-Navegition
yarn add @react-navigation/native

2. Instalar as dependencia para projeto expo
   expo install react-native-screens react-native-safe-area-context

3. Estratégia de navegação com o tabNavigation
   
4. dentro do src criar a pasta routes e arquivo app.routes.index.tsx  
o ponto app. só para aparecer o ícono 

### Personalizando o menu de navegação
app.routes.tsx

#### AsyncStore
Armazenamento local baseada chave valor
Armazena as informação no celular do usuário, permanente
1. colection_key => nome da tabela ou coleção ex: @gofinences:transactions,
coleção transactions é da aplicação @gofinences, para evitar conflito no
celular do usuário

2. Salvando dados setItem
3. Lendo dados getItem
4. Removendo dados removeItem
   
### Listagem das trasações
1. buscar todas as transações que estão salva no asyncstorage
   
 ### cartões das entradas, saidas e total
1. entradas: filtrar todas as entradas e soma
- última transação
2. saídas: filtra todas as saidas e soma
-- última transação
3. total diminui entradas - saídas
- Período
4. última transação de entrada e saída 
   
#### Tela de resumo
1.lista com despesa por categoria

### Formatando o Gráfico
yarn add victory-native