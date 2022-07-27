import React from "react";
/* tipagem do TextInput */
import { TextInputProps } from "react-native";

import { Container } from "./styles";
/* um tipo que igual a do TextInputProps */
type Props = TextInputProps;

/* pega todas as propriedades que vem do TextInputPros ...rest
e passa para o conteinar */
export function Input({...rest} : Props){
    return(
        <Container { ...rest } />
    )
}
