import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { addMonths, subMonths, format } from "date-fns";

/* tradução */
import { ptBR } from "date-fns/locale"

import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,

} from "./styles";
import theme from "../../global/styles/theme";

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number; /* para o gráfico */
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData>([]);

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
        setSelectedDate(subMonths(selectedDate, 1));
    }
  }
  /* função que busca todos od dados da nosso collection */
  async function loadData() {
    /* constante que armazena o nome da nossa colection */
    const dataKey = "@gofinances:transactions"

    /* recuperando os dados do asyncstorage e armaz em uma const */
    const response = await AsyncStorage.getItem(dataKey);

    /* convertendo os dados para objeto */
    const responseFormatted = response ? JSON.parse(response) : [];

    /* soma por categorias */
    /* filtrando as transações negativa que será demonstrado em um gráfico */
    const expensives = responseFormatted
      .filter((expensive: TransactionData) => 
      expensive.type === 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

    /* calculando o total p calcular a porcentagem de cada categoria
    reduce pega a coleção e soma os elementos tem dois parâmetros:
    acumullator a onde fica armazenado a somatória */
    const expensivesTotal = expensives
      .reduce((acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      }, 0);

    //console.log(expensivesTotal)

    /* percorrer a categoria e soma, uso o forEach não devolve nada,
    diferente do map() que retorna*/
    /* se a categoria desse gasto e igual a chave desse laço então
    encremento o categorySum */

    /*1.percarre cada categoria suponha que tenha cinco,
    então esse laço dar cinco volta nessa estrutura
    2.para cada categoria vou percorrer todos os gastos
    verificando se a categoria do gasto e a mesma da chave da categoria percorrida*/

    /* vetor que armazena a soma de cada laço */
    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensives: TransactionData) => {
        if (expensives.category === category.key) {
          categorySum += Number(expensives.amount);
        }
      });
      /* 1.push adiciona na lista um novo objeto
      2. adiciona só as categoria que tem valor */

      if (categorySum > 0) {

        const totalFormatted = categorySum
          .toLocaleString('pt-Br', {
            style: 'currency',
            currency: 'BRL'
          })

        /* cálculo da porcentagem p fazer o gráfico fixando em uma casa decimal */
        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })
    /* final estrutura de repetição aninhada */

    setTotalByCategories(totalByCategory);

    //console.log(totalByCategory)

  }

  useEffect(() => {
    loadData();
  }, [selectedDate])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {/* listgem das categorias */}
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >

        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>
            {format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
          </Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>

        </MonthSelect>


        {/* gráfico, precisamos passar um data */}
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            /* pega somente as cores da categoria */
            colorScale={totalByCategories.map(category => category.color)}
            /* estilização do label(numero da porcentagem) */
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            /* trazendo a pocentagem para dentro do gráfico */
            labelRadius={80}
            x="percent"
            y="total"
          />
        </ChartContainer>

        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
        }
      </Content>

    </Container>
  )

}