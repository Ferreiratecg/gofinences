import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { Feather } from '@expo/vector-icons';  //já com o expo
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { DataListProps } from './index';

export const Cantainer = styled.View`
flex: 1;
background-color: ${({ theme }) => (theme.colors.background)};
`;

//align-items: flex-start; cola o header no topo
export const Header = styled.View`
width: 100%;
height: ${RFPercentage(42)}px; 
background-color: ${({ theme }) => (theme.colors.primary)} ;
justify-content: center;
align-items: flex-start;
flex-direction: row;
`;


//justify-content: space-between; //itens ficam colado nas bordas respeidando o padding
export const UserWrapper = styled.View`
   width: 100%;
   
   padding: 0 24px;
   margin-top: ${getStatusBarHeight() + RFValue(28)}px;

   flex-direction: row;  
   justify-content: space-between;
   align-items : center;

`;

// flex-direction: row; //um do lado do outro
export const UserInfo = styled.View`
 flex-direction: row; 
`;

//border-radius: 10px; //não quebra o layout
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

export const Icon = styled(Feather)`
color: ${({ theme }) => theme.colors.secondary};
font-size: ${RFValue(24)}px;
`;
//Horizontal true cartões um ao lado do outro
//contentContainerStyle={{padding: 24}} estilização dentro do container
//attrs acessa as propriedades da scrolview pelo o styled components
export const HightLightCards = styled.ScrollView.attrs({
   horizontal: true,
   showsHorizontalScrollIndicator: false,
   contentContainerStyle: { paddingHorizontal: 24 }
})`
width: 100%;

position: absolute;
margin-top: ${RFPercentage(26)}px;
`;

//flex: 1; ocupa toda a tela
export const Transactions = styled.View`
flex: 1;
padding: 0 24px;

margin-top: ${RFPercentage(16)}px;
`;

export const Title = styled.Text`
font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.regular};

margin-top: 16px;
`;

export const TransactionList = styled(
   FlatList as new (props: FlatListProps<DataListProps>) => 
   FlatList<DataListProps>
   ).attrs({
   showsVerticalScrollIndicator: false,
   contentContainerStyle: {
      paddingBottom: getBottomSpace()
   }
})``;