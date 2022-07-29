import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AplleSvg from "../../assets/apple.svg"
import GogleSvg from "../../assets/google.svg"
import LogoSvg from "../../assets/logo.svg"

import { SigninSocialButton } from "../../components/SigninSocialButton";

import {
    Container,
    Header,
    TitleWraper,
    Title,
    SigninTitle,
    Footer,
    FooterWrapper,

} from "./styles";

export function Signin() {
    return (
        <Container>
            <Header>
                <TitleWraper>
                    <LogoSvg
                        width={RFValue(150)}
                        height={RFValue(98)}
                    />

                    <Title>
                        Controle suas{'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </Title>

                    <SigninTitle>
                        Faça seu login com{'\n'}
                        uma das contas abaixo
                    </SigninTitle>

                </TitleWraper>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SigninSocialButton
                        title="Entrar com Google"
                        svg={GogleSvg}
                    />

                    <SigninSocialButton
                        title="Entrar com Apple"
                        svg={AplleSvg}
                    />

                </FooterWrapper>
            </Footer>

        </Container>
    );
}