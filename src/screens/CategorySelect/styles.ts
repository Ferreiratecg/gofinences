import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler"
import theme from "../../global/styles/theme";

interface CategoryProps {
    isActive: boolean;
}

/* GestureHandlerRootView garante que o android não modifique os botões  */
export const Container = styled(GestureHandlerRootView)`
flex: 1;
background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
width: 100%;
height: ${RFValue(103)}px;

background-color: ${({ theme }) => theme.colors.primary};

align-items: center;
/* centraliza o componente no meio e no início do header */
justify-content: flex-end;

padding-bottom: 19px;

`;

export const Title = styled.Text`
font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.regular};

color: ${({ theme }) => theme.colors.shape};

`;

export const Category = styled(RectButton)<CategoryProps>`
width: 100%;

padding: ${RFValue(15)}px;

flex-direction: row;
align-items: center;

/* coloca um background no item selecionado */
background-color: ${({ isActive }) =>
isActive ? theme.colors.secondary : theme.colors.background
};
`;

export const Icon = styled(Feather)`
font-size: ${RFValue(20)}px;

margin-right: 16px;
`;

export const Name = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
height: 2px;
width: 100%;
background-color: ${({ theme }) => theme.colors.text };

`;

export const Footer = styled.View`
width: 100%;
padding: 24px;
`;

