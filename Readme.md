### 1. Configure seu ambiente de trabalho
### 2. Criação do projeto
2.1 expo init nomedoprojeto
2.2 escolha bare workflows

### 3. Adicione o typescript
3.1 crie o arquivo tsconfig.json
3.2 va para a pasta do projeto e execute expo start
obs: expo irá instalar as depedências do typescript e configurar o arquivo tsconfig.json
3.3 renomear o arquivo app.js para  app.tsx, para agregar a tipagem TS no componente
3.4 adicionar "strict": true no arquivo tsconfig.json
{
  "compilerOptions": {
    "strict": true 
  },
  "extends": "expo/tsconfig.base"  
}

### 4. Criar uma pasta src
4.1 criar uma pasta para armazena nossas pastas(screens)
4.2 criar dentro da screens o objeto Dashboard.tsx

### 5. Istalando o styled components (Estilização do projeto)
5.1 npm install --save styled-components
5.2 tipagem npm install @types/styled-components-react-native -D

### 6. Criar uma pasta global
6.1 Criar um objeto theme com as cores globas, um theme é composto por cores e fontes
6.2 Usando as cores globais
6.3 importa import { ThemeProvider } from 'styled-components'; 
no arquivo app.js envolvendo o Dashbord passando o nossa theme para o provider
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/styles/theme'
import { Dashboard } from './src/screens/Dashboard';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

usando o theme
background-color: ${(props) => (props.theme.colors.background)};
pego tudo que está no props, vamos desestrutura e trazer so o theme

### 7 Tipagem do thema
7.1 criar o arquivo styled.d.ts na pasta global styles

### 8. Instalando fontes
8.1 instalando fonts poppins
expo install expo-font @expo-google-fonts/poppins
8.2 importa a fonte no arquivo app.js nosso arquivo inicial
8.3 expo install expo-app-loading, lidar com o carregamento, enquanto a
fonte não for carregada ele não exibi o app, fazer o import np app.js

### 9.0 Instalação da biblioteca para de trabalhar com proporções (react-native-responsive-fontsize)
tem dois parâmetos RVvalue e RFPercentage, esta biblioteca tem com função
ajustar as fontes para vários dispositivos(Android e Ios)
9.1 Instalação npm install react-native-responsive-fontsize --save
9.2 height: ${RFPercentage(42)}px; usa px mais já convertido na proporção
9.3 para pegar o link da imagem do git coloca seu endereço .png

Obs: Nome da Pasta/arquivo => cria a pasta e o arquivo

### 10 Instalação biblioteca p tratar status bar 
npm i react-native-iphone-x-helper --save