import React from "react";
import { categories } from "../../utils/categories";
import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,

} from "./styles";

/*interface com muitas propriedades
vou criar um objeto data e envolve o conteúdo
com chave e só passo esse objeto.
- através do type vamos estilizar os cartões de entrada e saida
*/

/* exportando a interface com as propriedades do cartão
para ser usado no index.tsx dashboard */
export interface TransactionCardProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

/*meu data é do tipo Data*/
interface Props {
    data: TransactionCardProps;

}

export function TransactionCard({ data }: Props) {
    /* acessando o icone e nome da categoria,
    buscar as informações na colection, fazendo um filtro
    quero percorre cada item mas quero pegar o item em que item.key === data.category,
    o data.category é minha chave, o filter pode retorna uma coleção, como as caves são única,
    pego a posição da listagem[0] */
    const category = categories.filter(
        item => item.key === data.category
    )[0];
    return (
        <Container>
            <Title>
                {data.name}
            </Title>

            {/* passando os tipo(positive ou negative
                em seguida vamos tipar no styles.ts) */}
            <Amount type={data.type}>
                {/* se o type for negative acrescenta o sinal de menos com um espaço '- ' */}
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>
                        {category.name}
                    </CategoryName>
                </Category>

                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    )
}