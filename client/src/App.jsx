import { EthProvider } from "./contexts/EthContext";
import Home from "./components/Home";
function App() {
  return (
    <EthProvider>
      <div>
        <Home></Home>
      </div>
    </EthProvider>
  );
}

export default App;
