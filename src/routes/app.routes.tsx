import React from "react";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

/* acesso ao no theme atrvés do useTheme */
import { useTheme } from "styled-components";

import { Dashboard } from "../screens/Dashboard"
import { Register } from "../screens/Register"
import { Resume } from "../screens/Resume"

/* navegação tab parte de baixo do celular onde fica os icons de navegação */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* desistruturação */
const { Navigator, Screen } = createBottomTabNavigator();

/* criamos nossa função retornando um contexto de navegação importado acima
navigator é como se fosse uma caixa que guarda nassa telas a Screen renderiza
dois componentes name: nome que aparece na tela e componente que deve ser chamado */
export function AppRoutes() {
    /* pegando as propriedades do nosso theme */
    const theme = useTheme();
    return (
        /* propriedades que se aplica a todas as screens */
        <Navigator
            screenOptions={{
                /* remove o cabeçalho */
                headerShown: false,

                /* menu de baixo */
                /* define uma cor quando o menu estiver ativo */
                tabBarActiveTintColor: theme.colors.secondary,

                /* define uma cor quando o menu nãp estiver ativo */
                tabBarInactiveTintColor: theme.colors.text,

                /* icone ao lado do label */
                tabBarLabelPosition: 'beside-icon',

                /* aplicando um estilo na barra */
                tabBarStyle: {
                    height: 88,
                    /* padding condicionado a plataforma */
                    /* se estive rodando no ios coloca 20 caso contrario 0 */
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            {/* configuração específica para cada screen(options) */}
            <Screen
                name="Listagem"
                component={Dashboard}
                
                options={{
                    /* consigo recuperar o tamanho e cor dinamicamente,
                     porque quando o menu for selecionado cor laranja não selecionado
                     cor de cinza*/
                    tabBarIcon: (({ size, color }) => 
                    <MaterialIcons
                    name="format-list-bulleted"
                    size={size}
                    color={color}
                    />

                    )
                }}
            />

            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    /* consigo recuperar o tamanho e cor dinamicamente, de acordo com
                    as configurações acima, quando o menu for selecionado cor laranja não selecionado cor de cinza*/
                    tabBarIcon: (({ size, color }) => 
                    <MaterialIcons
                    name="attach-money"
                    size={size}
                    color={color}
                    />

                    )
                }}
            />

            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    /* consigo recuperar o tamanho e cor dinamicamente,
                     porque quando o menu for selecionado cor laranja não selecionado
                     cor de cinza*/
                    tabBarIcon: (({ size, color }) => 
                    <MaterialIcons
                    name="pie-chart"
                    size={size}
                    color={color}
                    />

                    )
                }}
            />

        </Navigator>
    )
}

/* disponibilizar a navegalçao no app.tsx */