import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/theme"; // 可選，統一樣式變數
import Home from "@/pages/Home";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
};

export default App;
