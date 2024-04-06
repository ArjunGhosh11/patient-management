import { useState } from 'react';
import contractData from '../contracts/PatientManagement.json';
import Web3 from 'web3';

// const [address,setAddress]=useState(" ");


// const contract = new web3.eth.Contract(, address);
console.log(contractData);

const Home = () => {
    const [address, setAddress] = useState("");
    const web3 = new Web3('http://localhost:7545');

    // 
    const myContract = new web3.eth.Contract(contractData.abi, contractData.networks[5777].address);

    myContract.methods.getAddress().call().then(result => {
        setAddress(result);
    }).catch(error => {
        console.error('Error calling contract method:', error);
    });
    return (
        <div className='text-sm m-10'>
            <h1 className=''>Owner's Address: {address}</h1>
        </div>
    );
};

export default Home;