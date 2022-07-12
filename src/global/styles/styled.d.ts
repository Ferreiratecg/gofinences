import 'styled-components';
import theme from './theme';

//sobre escreve o theme
//typeof faz com que o meu ThemeType tenha o mesmo tipo do meu theme
declare module 'styled-components'{
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType{}
}