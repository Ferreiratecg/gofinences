import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
/* usando o componente Input p construir o componente InputForm */
import { Input } from "../Input"

import {
    Container,
    Error
} from "./styles"

interface Props extends TextInputProps {
    /* React Hook Forms */
    control: Control;
    /* para dferenciar um input do outro */
    name: string;
    error: string;
    
}

export function InputForm({
    control,
    name,
    error,
    ...rest
}: Props) {
    return (
        /* 1.Colocamos o container para definir uma largura de 100%
           2.Usamos o ontroler para não renderizando a toda hora as modificação do input
           3. control identifica input do mesmo formulário
           4. um render p renderizar as mudanças e valor dos input  */
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                    onChangeText={onChange}
                    value={value}
                        {...rest}
                    />
                )}
                name={name}
            />
            {/* se tem error então(&&) mostra o componente de error */}
            { error && <Error>{ error }</Error> } 
        </Container>
    )
}