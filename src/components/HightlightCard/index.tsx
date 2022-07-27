import React from "react";

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction,
} from "./styles";

interface Props {
    /*opções dos tipos de cartão dinamicamente para o dashboard*/
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}
/*constante que vai auxiliar com os icons
com um objeto que passa os tres tipo:
caso se up vai ser arraw-up-circle
caso seja down vai ser arrow-down-circle
caso seja total va ser attach-sign*/
const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
}

/*Passando as propriedades(tipagem) para o cartão*/

export function HightlightCard({
    type,
    title,
    amount,
    lastTransaction }: Props) {
    return (
        <Container type={type}>
            <Header>
                {/*as proprieades são passada no momento que chamar o cartão
                no dashboard.tsx*/}
                <Title type={type}>
                    {title}
                </Title>
                {/*Icon recepe e passa as propriedade type, type={type*/}
                <Icon
                    name={icon[type]}
                    type={type} />
            </Header>
            <Footer>
                <Amount
                    type={type}>
                    {amount}
                </Amount>
                <LastTransaction type={type}>
                    {lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>
    )
}