import React from "react";
import {RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";

import {
    Container,
    Category,
    Icon,
} from "./styles"

interface Props extends RectButtonProps{
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({
     title,
      onPress,
      ...rest
     }: Props) {
    return (
        <GestureHandlerRootView>
            <Container onPress={onPress} {...rest}>
                <Category>{title}</Category>
                <Icon name="chevron-down" />
            </Container>
        </GestureHandlerRootView>
    )
} 