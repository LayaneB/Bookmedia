import { GlobalStyle } from "./theme/GlobalStyle"
import GlobalState from './global/GlobalState'
import Router from "./routes/Router";

function App() {
  return (
    <GlobalState>
      <GlobalStyle />
      <Router />
    </GlobalState>
  );
}

export default App;