import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #000; /* 全域設定所有文字顏色為黑色 */
    font-family: 'Arial', sans-serif; /* 設定預設字型 */
    background-color: #f8f9fa; /* 設定全域背景色 */
  }

  h1, h2, h3, h4, h5, h6, p, span, div {
    color: inherit; /* 讓所有元素繼承 body 的顏色 */
  }

  button {
    &:focus {
      outline: none; /* 移除按下後的黑色邊框 */
    }
  }
  
`;

export default GlobalStyle;
