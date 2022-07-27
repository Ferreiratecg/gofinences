
import styled, { css } from "styled-components/native"; /*css:estilisa as cores dos icons*/
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

/*para utilizar meus icons aqui precisa fazer a tipagem
passamos pa Icon e Container
*/
interface TypeProps{
    type: 'up' | 'dow' | 'total';
}

/*se o meu cartão for total faz uma verificação com o 
if ternário emtão(?) adiciona uma cor secondary se não
adiciona uma cor pranca*/
export const Container = styled.View<TypeProps>`
background-color: ${({ theme, type }) =>
type === 'total' ?  theme.colors.secondary : theme.colors.shape};

width: ${RFValue(300)}px;
border-radius: 5px;

padding: 19px 23px;
padding-bottom: ${RFValue(42)}px;
margin-right: 16px;/*magem entre os cartões*/

/*altura de acordo com o conteúdo e padding*/
//height: 300px; será proporcional ao conteúdo*/
`;

export const Header = styled.View`
flex-direction: row; /*comp header um do lado do outro*/
justify-content: space-between;/*comp um de cada lado */
`;

export const Title = styled.Text<TypeProps>`
font-family:  ${({ theme }) => theme.fonts.regular };
font-size: ${RFValue(14)}px;

flex-direction: row;

color: ${({ theme }) => theme.colors.text_dark };

color: ${({ theme, type }) =>
type === 'total' ?  theme.colors.shape : theme.colors.text_dark};
`;

/*Icon alem da biblioteca Feather
também recebe as propriedades de type*/
export const Icon = styled(Feather)<TypeProps>`
font-size: ${RFValue(40)}px;

/*se o tipo for 'up' acrescenta o css*/
${({type}) => type === 'up' && css`
color: ${({theme})=> theme.colors.success};
`};

${({type}) => type === 'down' && css`
color: ${({theme})=> theme.colors.attention};
`};

${({type}) => type === 'total' && css`
color: ${({theme})=> theme.colors.shape};
`};

`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
font-family:  ${({ theme }) => theme.fonts.medium };
font-size: ${RFValue(32)}px;

color: ${({ theme, type }) =>
type === 'total' ?  theme.colors.shape : theme.colors.text_dark};
margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
font-family:  ${({ theme }) => theme.fonts.regular };
font-size: ${RFValue(12)}px;

color: ${({ theme, type }) =>
type === 'total' ?  theme.colors.shape : theme.colors.text};
`;
