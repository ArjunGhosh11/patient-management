import { EthProvider } from "./contexts/EthContext";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <EthProvider>
      <div>
        <Routes>
          <Route path="/" element={
            <Home></Home>
          }></Route>
        </Routes>
      </div>
    </EthProvider>

  );
}

export default App;
