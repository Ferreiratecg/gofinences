import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { categories } from "../../utils/categories";
import { Button } from "../../components/Form/Button";

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
    ButtonText,
} from "./styles";

/* Tipagem */
interface Category {
    key: string;
    name: string;
}

interface Props {
    category: string;
    /* função que atualiza o estado, recebe a chave e o nome da categoria*/
    setCategory: (category: Category) => void;
    /* função que fecha o modal */
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props) {

    function handleCategorySelect(category: Category){
        setCategory(category);
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
            /* data recebe a tabela de categorias */ 
            data={categories}
            /* fazemos a estilização aqui e depois levamos p o styled-components */
            style={{flex: 1, width: '100%'}}

            keyExtractor={(item) => item.key}

            /* para cada item rederiza uma categoria */
            renderItem={({ item }) => (
                <Category
                /* toda vez que clicar paga o item e passa p handleCategorySelect*/
                onPress={() => handleCategorySelect(item)}
                /* verfca se o item está activo */
                isActive={category.key === item.key}
                >
                  {/* categoria espera um Icon que vem dentro de item.icon */}
                    <Icon name={item.icon} />
                  {/*nome da categoria*/}
                   <Name>{item.name}</Name>
                </Category>
            )}
            /* renderizando o Separator linha que separa as cat */
            ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                {/* aproveitando o componente Button do Form mudando só o tittle 
                passando o closeSelectCategory*/}
                <Button title="Selecionar" 
                onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}