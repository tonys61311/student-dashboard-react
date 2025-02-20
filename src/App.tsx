import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/common/styles/GlobalStyle";
import theme from "@/common/styles/theme"; // 可選，統一樣式變數
import ClassroomPanel from "@/features/ClassroomPanel";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ClassroomPanel />
    </ThemeProvider>
  );
};

export default App;
