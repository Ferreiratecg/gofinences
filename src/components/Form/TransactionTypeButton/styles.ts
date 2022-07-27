import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "react-native/Libraries/NewAppScreen";
//import { TouchableOpacity } from "react-native";
import theme from "../../../global/styles/theme";

/* icon up: success dowm: attention color */
interface IconProps {
    type: 'up' | 'down';
}
/* tipagem do isActive, além de saber se
ele está ativo seu também o tipo dele
para poder fazer a combinação da cor  */
interface ContainerProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
width: 48%;

/* não funciona com o ReccButton
 retira a bordar com isActive for true*/ 
border-width: ${({ isActive }) => isActive ? 0 : 1.5}px; 
border-style: solid;
border-color: ${({ theme }) => theme.colors.text_dark }
border-radius: 5px;



/* acessando as proprieades do isActive e types
varificação se o isActive e verdadeiro e o type igual a 'down'
então acrescento uma estilização */
${({ isActive, type }) => isActive && type === 'up' && css`
background-color: ${({ theme }) => theme.colors.success_light};
`};

/* acessando as proprieades do isActive e types
varificação se o isActive e verdadeiro e o type igual a 'down'
então acrescento uma estilização */
${({ isActive, type }) => isActive && type === 'down' && css`
background-color: ${({ theme }) => theme.colors.attention_light};
`};

`;

/* fix problema da bordar */
export const Button = styled(RectButton)`

/* icon e title um ao lado do outro */
flex-direction: row;
/* alinha os itens  */
align-items: center;
justify-content: center;

padding: 16px;
`;

/* Icon recebe além do Feather a tipagem <IconProps> */
export const Icon = styled(Feather)<IconProps>`
font-size: ${RFValue(24)}px;
margin-right: 12px;
/* acessar o theme e as cores e  faz a verificação */
color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.success : theme.colors.attention
    };
`;

export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`;

export const TransactionTypes = styled.View`
flex-direction: row;
`;