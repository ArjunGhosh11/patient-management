import { useEffect, useState } from 'react';
import contractData from '../contracts/PatientManagement.json';
import Web3 from 'web3';
import '../App.css';
import AddPatients from './AddPatients';
import AdminDashboard from './AdminDashboard';
import CovidTrends from './CovidTrends/CovidTrends';

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [registerToggle, setRegisterToggle] = useState(false);
    const [connectedAcc, setConnectedAcc] = useState('');
    const [address, setAddress] = useState("");
    const web3 = new Web3('http://localhost:7545');
    const myContract = new web3.eth.Contract(contractData.abi, contractData.networks[5777].address);
    const [userInfo, setUserInfo] = useState();
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
            // const user = await myContract.methods.getUserByAddress(accounts[0]).call();
            // setUserInfo(user);
            // console.log(userInfo);
        } else {
            alert("Please download metamask");
        }
    }

    const getUserInfo = async () => {
        const result = (await myContract.methods.getUserByAddress(connectedAcc).call());
        return result;
    }

    useEffect(() => {
        getUserInfo().then((result) => {
            setUserInfo(result);
            console.log("User=", result)
        })
    }, [connectedAcc]);


    return (
        <div className='px-20 w-full  align-middle flex flex-col text-dark'>
            <h1 className='text-center text-xl font-bold my-10 '>COVID CARE HOSPITAL</h1>
            {/* 
            ACCOUNT CONNECTION SECTION
            */}
            <div className='mb-10'>
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
                                Register a Patient
                            </button> :
                            connectedAcc ?
                                <button onClick={() => toggleState(registerToggle, setRegisterToggle)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-50'>
                                    Hide Form
                                </button> :
                                <h1></h1>

                    }
                </div >
                {
                    registerToggle ?
                        <AddPatients myContract={myContract} connectedAcc={connectedAcc}></AddPatients>
                        :
                        <h1></h1>
                }
                {
                    !userInfo?.is_admin && isConnected ?
                        <div className='w-60 shadow-xl rounded-xl p-5'>
                            <h1 className='text-sm my-2'><span className='font-bold'>ID: </span>{userInfo?.id}</h1>
                            <h1 className='text-sm my-2'><span className='font-bold'>AGE: </span>{userInfo?.age}</h1>
                            <h1 className='text-sm my-2'><span className='font-bold'>GENDER: </span>{userInfo?.gender}</h1>
                            <h1 className='text-sm my-2'><span className='font-bold'>Vaccine Status: </span>{userInfo?.vaccine_status}</h1>
                            <h1 className='text-sm my-2'><span className='font-bold'>SYMPTOMS: </span>{userInfo?.symptoms_details}</h1>
                            <h1 className='text-sm my-2'><span className='font-bold'>STATUS: </span>{userInfo?.is_dead ? "Download Death Certificate" : "NOT DEAD"}</h1>
                        </div> :
                        <p></p>
                }
            </div>
            {/* COVID TREND SECTION */}
            <div>
                <CovidTrends></CovidTrends>
            </div>
            {/* 
            ADMIN's UPDATE SECTION
            */}
            {
                userInfo?.is_admin ?
                    <div>
                        <AdminDashboard myContract={myContract}
                            connectedAcc={connectedAcc}></AdminDashboard>
                    </div> :
                    <div>
                        <h1 className='font-bold text-center'>........</h1>
                    </div>
            }

        </div>
    );
};

export default Home;