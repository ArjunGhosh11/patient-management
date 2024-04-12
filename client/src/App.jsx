import { EthProvider } from "./contexts/EthContext";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeathCertificate from "./components/DeathCertificate";
import VaccineCertificate from "./components/VaccineCertificate";
function App() {
  return (
    <EthProvider>
      <div>
        <Routes>
          <Route path="/" element={
            <Home></Home>

          }></Route>
          <Route path="/DC/:address" element={
            <DeathCertificate></DeathCertificate>
          }></Route>
          <Route path="/VC/:address" element={
            <VaccineCertificate></VaccineCertificate>
          }></Route>
        </Routes>
        <ToastContainer />
      </div>
    </EthProvider>

  );
}

export default App;
