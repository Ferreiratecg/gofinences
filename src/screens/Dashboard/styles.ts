import styled from "styled-components/native";
import { FlatList } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";

/* iportando as propriedades do cartão */
import { DataListProps } from "./index"

export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
width: 100%;
height: ${RFPercentage(42)}px;

background-color: ${({ theme }) => theme.colors.primary};

justify-content: center;
/*alinha o header no top*/
align-items: flex-start;
flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%; /*ocupa toda lagura da tela e fica a esquerta*/

  /*em cima e em baixo 0 e dir e esq 24*/
  padding: 0 ${RFValue(24)}px;    
  /*icon power fica ao lado dos outros components*/
  flex-direction: row;
  
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  /*icon power vai para a lateral direita e components na esquerda*/
  justify-content: space-between;
  /*icon power fica centralizado com os outros components*/
  align-items : center ;

`;

export const InfoUser = styled.View`
flex-direction: row; /*um ao lado do outro*/
align-items: center; /*texto centralizado*/
`;

export const Photo = styled.Image`
width: ${RFValue(48)}px;
height: ${RFValue(48)}px;

border-radius: 10px;
`;

export const User = styled.View`
margin-left: 17px;
`;

export const UserGreeting = styled.Text`
color: ${({ theme }) => theme.colors.shape};

font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
color: ${({ theme }) => theme.colors.shape};

font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
color: ${({ theme }) => theme.colors.secondary};
font-size: ${RFValue(24)}px;
`;

/*fazemos com o ScrollView porque só são tres cartões
caso fosse mais usariámos a FlatList
attrs acessa as propriedades da scrollview com o style-component
 passando como objeto */
export const HightlightCards = styled.ScrollView.attrs({
  horizontal: true, /*cartões na horizontal colocando
  só o Horinzontal já entende com true*/
  showsHorizontalScrollIndicator: false, /*retira a barra hor*/
  /*acrescenta um style na ista garante um espaçamento o inívio e final da lista*/
  contentContainerStyle: { paddingHorizontal: 24 }
})`
width: 100%; /*garante q a lista de cartões ocupe 100 da tela*/
/*lista de cartões no top da tela*/
position: absolute;
/*margem top lista*/
margin-top: ${RFPercentage(20)}px;
`;

export const Transcsations = styled.View`
flex: 1; /*ocupa todo espaço restante da tela*/
padding: 0 24px;

margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.regular};
`;

/*1. listagem das transações
  2.o attrs permite o acesso as propriedades da FatList
  que está no index.tsx - dashboard 
  3. criando uma tipagem personalizada com o FlatList
  */
export const TransactionList = styled(FlatList).attrs({
  /* retira a barra vertical de rolagem */
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
     /* somente para iphone */
    paddingBottom: getBottomSpace() + 10,
  },              /* vou falar que minha FlatLista vai ser uma nova
                  FlatList que vai ter um tipo<DataListProps> */
})`` as React.ComponentType as new <DataListProps>() => FlatList<DataListProps>;

export const LoadContainer = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;