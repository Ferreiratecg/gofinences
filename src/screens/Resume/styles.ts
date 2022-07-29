import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

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

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
width: 100%;
align-items: center;
`;

export const MonthSelect = styled.View`
flex: 1;

flex-direction: row;
justify-content: space-between;
align-items: center;

margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular };
font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;