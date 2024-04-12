import React, { useEffect, useState } from 'react';
import useDaysFromDate from '../../hooks/useDaysFromDate';
// import useAllPatient from '../../hooks/useAllPatient';
import contractData from "../../contracts/PatientManagement.json";
import Web3 from 'web3';
import { useStats } from '../../hooks/useStats';


const CovidTrends = () => {
    const [patients, setPatients] = useState([]);
    const [patientAdded, setPatientAdded] = useState(false);
    const [patientUpdated, setPatientUpdated] = useState(false);
    // const [days, setDays] = useState(useDaysFromDate());


    const days = useDaysFromDate();
    // console.log(days);
    // const web3 = new Web3('http://localhost:7545');
    const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
    const myContract = new web3.eth.Contract(contractData.abi, contractData.networks[5777].address);
    //GETTING ALL STATS
    const {
        deathRate,
        highestPatientDistrict,
        medianAgeByDistrict,
        ageGroupPercentages,
    } = useStats(patients, days);

    //GET ALL USERS

    // useEffect(() => {
    //     async function fetchPatients() {
    //         const fetchedPatients = await myContract.methods.getAllPatients().call();
    //         setPatients(fetchedPatients);
    //         console.log(fetchedPatients);
    //     }

    //     fetchPatients();

    //     if (patientAdded || patientAdded) {
    //         setPatientAdded(false);
    //         setPatientUpdated(false);
    //     }
    // }, [patientAdded, patientUpdated]);
    // useEffect(() => {
    //     const getFutureEvents = async () => {
    //         try {
    //             // Listen for NewPatientAdded events
    //             (myContract.events.patientAdded)({
    //                 filter: {}, // You can filter the events here
    //             })
    //                 .on("data", (event) => {
    //                     console.log("PatientAdded event", event);
    //                     setPatientAdded(true);
    //                 })
    //                 .on("error", console.error);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getFutureEvents();
    // }, []);
    // useEffect(() => {
    //     const getFutureEvents = async () => {

    //         try {
    //             // Listen for APatientIsUpdated events
    //             (myContract.events.patientUpdated)(
    //                 {
    //                     filter: {}, // You can filter the events here
    //                 }
    //             )
    //                 .on("data", (event) => {
    //                     console.log("New APatientIsUpdated event", event);
    //                     setPatientUpdated(true);
    //                 })
    //                 .on("error", console.error);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     getFutureEvents();
    // }, []);

    useEffect(() => {
        async function fetchPatients() {
            const fetchedPatient = await myContract.methods.getAllPatients().call();
            setPatients(fetchedPatient);
            console.log(fetchedPatient);
        }

        fetchPatients();

        const getFutureEvents = async () => {
            try {
                // Listen for NewPatientAdded events
                console.log("In Get EVENTS")
                myContract.events.patientAdded({
                    filter: {}, // You can filter the events here
                })
                    .on("data", (event) => {
                        console.log("PatientAdded event", event);
                        setPatientAdded(true);
                        fetchPatients(); // Re-fetch patients data
                    })
                    .on("error", console.error);

                // Listen for APatientIsUpdated events
                myContract.events.patientUpdated({
                    filter: {}, // You can filter the events here
                })
                    .on("data", (event) => {
                        console.log("New APatientIsUpdated event", event);
                        setPatientUpdated(true);
                        fetchPatients(); // Re-fetch patients data
                    })
                    .on("error", (error) => {
                        console.log("Error in event listenner ", error.message);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        if (patients) {
            getFutureEvents();
        }
    }, [patientAdded, patientUpdated]); // Keep the dependency array empty if you only want to set up the listeners once



    return (
        <div className='mb-10 lg:px-40'>
            <h1 className='text-lg font-semibold text-center my-5'>COVID TRENDS</h1>
            {/* DEATH RATE and DISTRICT WITH HIGHEST COVID PATIENT */}
            <div className='mb-5'>
                <div className="overflow-x-auto font-bold shadow-xl rounded-xl bg-slate-200 outline">
                    <table className="table">
                        {/* head */}
                        <thead className='outline'>
                            <tr>
                                <th className='outline'>DEATH RATE</th>
                                <th className='outline'>DISTRICT WITH HIGHEST PATIENT</th>
                                <th className='outline'>% of Children</th>
                                <th className='outline'>% of Teenagers</th>
                                <th className='outline'>% of Young</th>
                                <th className='outline'>% of Elder</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th className='outline'>{deathRate}</th>
                                <td className='outline'>{highestPatientDistrict}</td>
                                <td className='outline'>{ageGroupPercentages?.Children}</td>
                                <td className='outline'>{ageGroupPercentages?.Teenagers}</td>
                                <td className='outline'>{ageGroupPercentages?.Young}</td>
                                <td className='outline'>{ageGroupPercentages?.Elder}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            {/* MEDIAN AGES OF DISTRICTS */}
            <div className='mb-5'>
                <div className="overflow-x-auto font-bold shadow-xl rounded-xl bg-slate-200 outline">
                    <table className="table">
                        {/* head */}
                        <thead className='outline'>
                            <tr>
                                <th className='outline'>DISTRICT</th>
                                <th className='outline'>MEDIAN AGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {/* <tr>
                                <th className='outline'>3</th>
                                <td className='outline'>Dhaka</td>
                            </tr> */}
                            {Object.entries(medianAgeByDistrict).map(([key, value]) => (
                                <tr key={key}>
                                    <th className='outline'>{key}</th>
                                    <th className='outline'>{value}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default CovidTrends;