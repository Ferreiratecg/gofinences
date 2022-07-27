import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

/* tipagem dos tipos positivo ou negative */
interface TransactionProps {
    type: 'positive' | 'negative';
};

export const Container = styled.View`
background-color: ${({ theme }) => theme.colors.shape };
border-radius: 5px;
padding: 17px 24px;

/* margim-botton dos componentes da listagem */
margin-bottom: 16px;
`;

export const Title = styled.Text`
font-size: ${({ theme }) => theme.fonts.regular };
font-size: ${RFValue(14)}px;
`;

/* quantia recebendo os types positivo ou negativo */
export const Amount = styled.Text<TransactionProps>`
font-size: ${({ theme }) => theme.fonts.regular };
font-size: ${RFValue(20)}px;
margin-top: 2px;

/* cores recebendo o thema e os types
se type for positive success se não attention */
color: ${({ theme, type }) => 
type === 'positive' ? theme.colors.success : theme.colors.attention };
`;

export const Footer = styled.View`
flex-direction: row; /*categoria e data um ao lado outro*/
justify-content: space-between; /*comp nas extreminades*/
align-items: center; /*comp align na vertical*/

margin-top: 19px;
`;

export const Category = styled.View`
flex-direction: row; /*categoria e data um ao lado outro*/
align-items: center; /*comp align na vertical*/
`;

export const Icon = styled(Feather)`
font-size: ${RFValue(20)}px;
color: ${({ theme }) => theme.colors.text };
`;

export const CategoryName = styled.Text`
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.text };

margin-left: 17px;
`;

export const Date = styled.Text`
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.text };
`;