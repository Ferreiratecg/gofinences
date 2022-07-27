import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  margin: 8px 0;
  padding: ${RFValue(18)}px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(14)}px;

`;

export const Icon = styled(Feather)`
font-size: ${RFValue(20)}px;
color: ${({ theme }) => theme.colors.text};


`;