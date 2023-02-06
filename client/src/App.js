import "./css/App.css";
import Linktree from "./Linktree";

import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      dark: {
        main: "#000",
      },
    },
  });
  return (
    // PROXY not working
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Linktree />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
