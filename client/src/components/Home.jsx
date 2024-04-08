import { useEffect, useState } from 'react';
import contractData from '../contracts/PatientManagement.json';
import Web3 from 'web3';
import '../App.css';
import AddPatients from './AddPatients';
import AdminDashboard from './AdminDashboard';

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [registerToggle, setRegisterToggle] = useState(false);
    const [connectedAcc, setConnectedAcc] = useState('');
    const [address, setAddress] = useState("");
    const web3 = new Web3('http://localhost:7545');
    const myContract = new web3.eth.Contract(contractData.abi, contractData.networks[5777].address);

    //#####GETTING OWNERS ADDRESS########
    const getOwnerAddress = async () => {
        const result = (await myContract.methods.getAddress().call());
        return result;
    }
    useEffect(() => {
        getOwnerAddress().then((result) => {
            setAddress(result);
        })
    })
    const toggleState = (state, setState) => {
        setState(!state);
        console.log(state);
    };
    //#########CONNECTING TO METAMASK########
    async function connectMetamask() {
        //Check if metamask is installed
        if (window.ethereum) {
            // instantiate Web3 with the injected provider
            const web3 = new Web3(window.ethereum);

            //request user to connect accounts (Metamask will prompt)
            await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            //get the connected accounts
            const accounts = await web3.eth.getAccounts();

            //show the first connected account in the react page
            setConnectedAcc(accounts[0]);
            setIsConnected(true);
        } else {
            alert("Please download metamask");
        }
    }


    return (
        <div className='px-20 w-full  align-middle flex flex-col text-dark'>
            <h1 className='text-center text-xl font-bold my-10 '>COVID CARE HOSPITAL</h1>
            {/* 
            ACCOUNT CONNECTION SECTION
            */}
            <div className=''>
                {/* <h1 className='font-bold mb-10 text-sm'>
                    Owner's Address: {address}</h1> */}
                <h1 className="text-md font-semibold">Connected Account: {connectedAcc}</h1>
                <div className='flex justify-between my-5'>
                    <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                        disabled={!!isConnected}
                        type="submit"
                        onClick={connectMetamask}
                    >
                        {isConnected
                            ? "Metamask Connected ✅"
                            : "Connect to Metamask"}
                    </button>
                    {
                        (!registerToggle && connectedAcc) ?
                            <button onClick={() => toggleState(registerToggle, setRegisterToggle)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-50'>
                                Register as Patient
                            </button> :
                            connectedAcc ?
                                <button onClick={() => toggleState(registerToggle, setRegisterToggle)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-50'>
                                    Hide Form
                                </button> :
                                <h1></h1>

                    }
                </div>
                {
                    registerToggle ?
                        <AddPatients myContract={myContract} connectedAcc={connectedAcc}></AddPatients>
                        :
                        <h1></h1>
                }
            </div>
            {/* 
            ADMIN's UPDATE SECTION
            */}
            <div>
                <AdminDashboard myContract={myContract}
                    connectedAcc={connectedAcc}></AdminDashboard>
            </div>
        </div>
    );
};

export default Home;