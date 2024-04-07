import { useEffect, useState } from 'react';
import contractData from '../contracts/PatientManagement.json';
import Web3 from 'web3';
import '../App.css';
import AddPatients from './AddPatients';
// const [address,setAddress]=useState(" ");

// const contract = new web3.eth.Contract(, address);
console.log(contractData);

const Home = () => {

    const [address, setAddress] = useState("");
    const web3 = new Web3('http://localhost:7545');

    // 
    const myContract = new web3.eth.Contract(contractData.abi, contractData.networks[5777].address);
    const getOwnerAddress = async () => {
        const result = (await myContract.methods.getAddress().call());
        return result;
    }
    // myContract.methods.getAddress().call().then(result => {
    //     setAddress(result);
    // }).catch(error => {
    //     console.error('Error calling contract method:', error);
    // });
    useEffect(() => {
        getOwnerAddress().then((result) => {
            setAddress(result);
        })
    })
    return (
        <div className='p-20 w-full  align-middle flex flex-col text-dark'>
            <h1 className='text-xl font-bold mb-10'>
                Owner's Address:
                {address}</h1>
            <AddPatients></AddPatients>
        </div>
    );
};

export default Home;