import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.colors.background };
`;

export const Header = styled.View`
/* back-ground cor primary do nosso tema */
background-color: ${({ theme }) => theme.colors.primary };
/* ocupa toda largura da tela */
width: 100%;
/* altura proporcional a densidade ios/android */
height: ${RFValue(103)}px;
/* texto no centro da tela */
align-items: center;
/* texto em baixo no centro do header */
justify-content: flex-end;
/* magem de baixo */
padding-bottom: 19px;
`;

export const Title = styled.Text`
/* tipo da fonte */
font-family: ${({ theme }) => theme.fonts.regular };
/* tamanho da fonte */
font-size: ${RFValue(18)}px;
/* cor do do título shape cor branco do nosso tema */
color: ${({ theme }) => theme.colors.shape };
`;

export const Form = styled.View`
flex: 1;
/* posiciona o botão Enviar na parte baixa da tela */
justify-content: space-between;
width: 100%;

padding: 24px;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
flex-direction: row;
justify-content: space-between;

margin-top: 8px;
margin-bottom: 16px;

`;