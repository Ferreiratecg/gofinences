import React from 'react'; //arquivo tsx

import {
    Container,
    Header,
    Footer,
    Title,
    Icon,
    Amount,
    LastTrasaction,
} from './styles';

interface Props {
    type: 'up' | 'dow' | 'total';
    title: string;
    amount: string;
    lastTrasaction: string;
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

//  <Icon name={icon[type] type={type}} /> diz p o icon que ele tem a props type
export function HightLightCard({
    type,
    title,
    amount,
    lastTrasaction
}: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>
                    {title}
                </Title>
                <Icon
                    name={icon[type]}
                    type={type} />
            </Header>
            <Footer>
                <Amount type={type}>
                    {amount}
                </Amount>
                <LastTrasaction type={type}>
                    {lastTrasaction}
                </LastTrasaction>
            </Footer>
        </Container>
    )
}