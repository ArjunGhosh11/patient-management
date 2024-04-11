import { EthProvider } from "./contexts/EthContext";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <EthProvider>
      <div>
        <Routes>
          <Route path="/" element={
            <Home></Home>

          }></Route>
        </Routes>
        <ToastContainer />
      </div>
    </EthProvider>

  );
}

export default App;
