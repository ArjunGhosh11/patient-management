import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddAdmin from './AddAdmin';
import { toast } from 'react-toastify';
const AdminDashboard = ({ myContract, connectedAcc }) => {
    const [patients, setPatients] = useState([]);
    const [patientAdded, setPatientAdded] = useState(false);
    const [patientUpdated, setPatientUpdated] = useState(false);
    const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errorsForm1 }, reset: reset1 } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errorsForm2 }, reset: reset2 } = useForm();
    const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errorsForm3 }, reset: reset3 } = useForm();

    // Form submission handlers
    const onSubmit1 = data => {
        // console.log('Form 1 data:', data);
        myContract.methods.issueDeathCertificate(data.issueAdd).send({ from: connectedAcc || "" })
            .then(() => {
                toast.success("Death Certificate Issued");
                reset1()
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }
    const onSubmit2 = data => {
        // console.log('Form 2 data:', data);
        myContract.methods.cancelDeathCertificate(data.cancelAdd).send({ from: connectedAcc || "" })
            .then(() => {
                toast.success("Death Certificate Canceled");
                reset2()
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }
    const onSubmit3 = data => {
        myContract.methods.vaccinate(data.vaccineAdd).send({ from: connectedAcc || "" })
            .then(() => {
                toast.success("Patient Vaccinated!");
                reset3()
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }


    //

    useEffect(() => {
        async function fetchPatients() {
            const fetchedPatients = await myContract.methods.getAllPatients().call();
            setPatients(fetchedPatients);
            console.log(fetchedPatients);
        }

        fetchPatients();

        if (patientAdded || patientAdded) {
            setPatientAdded(false);
            setPatientUpdated(false);
        }
    }, [patientAdded, patientUpdated]);
    useEffect(() => {
        const getFutureEvents = async () => {
            if (myContract) {
                try {
                    // Listen for NewPatientAdded events
                    (myContract.events.patientAdded)({
                        filter: {}, // You can filter the events here
                    })
                        .on("data", (event) => {
                            console.log("PatientAdded event", event);
                            setPatientAdded(true);
                        })
                        .on("error", console.error);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getFutureEvents();
    }, []);
    useEffect(() => {
        const getFutureEvents = async () => {
            if (myContract) {
                try {
                    // Listen for APatientIsUpdated events
                    (myContract.events.patientUpdated)(
                        {
                            filter: {}, // You can filter the events here
                        }
                    )
                        .on("data", (event) => {
                            console.log("New APatientIsUpdated event", event);
                            setPatientUpdated(true);
                        })
                        .on("error", console.error);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getFutureEvents();
    }, []);

    return (

        <div className='bg-gray-200 shadow-lg p-6 rounded-lg'>
            <h1 className='text-lg font-semibold text-center'>ADMIN DASHBOARD</h1>
            <div className='flex flex-col align-middle justify-center'>
                <div className='flex justify-between flex-wrap'>
                    <div className='my-5 shadow-xl bg-slate-100 p-5 rounded-xl'>
                        <h1 className='text-sm font-semibold'>ISSUE DEATH CERTIFICATE</h1>
                        <div className=''>
                            <form className='flex flex-col justify-between relative ' onSubmit={handleSubmit1(onSubmit1)}>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label my-2">
                                        <span className="label-text">Patient Wallet Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wallet Address"
                                        className="input input-bordered w-full max-w-xs p-2 rounded-lg mt-3"
                                        {...register1("issueAdd", {
                                            required: {
                                                value: true,
                                                message: 'Address is Required'
                                            },
                                            pattern: {
                                                value: /^(0x)?[0-9a-fA-F]{40}$/,
                                                message: 'Invalid Ethereum address'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errorsForm1.add?.type === 'required' && <span className="label-text-alt text-red-500">{errorsForm1.add?.message}</span>}
                                    </label>
                                </div>
                                <input className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-40 max-w-xs ml-40' type="submit" value="ISSUE" />
                            </form>
                        </div>
                    </div>
                    {/* 
                    CANCEL DEATH CERTIFICATE
                    */}
                    <div className='my-5 shadow-xl bg-slate-100 p-5 rounded-xl'>
                        <h1 className='text-sm font-semibold'>CANCEL DEATH CERTIFICATE</h1>
                        <div className=''>
                            <form className='flex flex-col justify-between relative' onSubmit={handleSubmit2(onSubmit2)}>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label my-2">
                                        <span className="label-text">Patient Wallet Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wallet Address"
                                        className="input input-bordered w-full max-w-xs p-2 rounded-lg mt-3"
                                        {...register2("cancelAdd", {
                                            required: {
                                                value: true,
                                                message: 'Address is Required'
                                            },
                                            pattern: {
                                                value: /^(0x)?[0-9a-fA-F]{40}$/,
                                                message: 'Invalid Ethereum address'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errorsForm2.add?.type === 'required' && <span className="label-text-alt text-red-500">{errorsForm2.add?.message}</span>}
                                    </label>
                                </div>
                                <input className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-40 max-w-xs ml-40' type="submit" value="CANCEL" />
                            </form>
                        </div>

                    </div>
                    {/* 
                    VACCINATE PATIENT
                    */}
                    <div className='my-5 shadow-xl bg-slate-100 p-5 rounded-xl'>
                        <h1 className='text-sm font-semibold'>VACCINATE PATIENTS</h1>
                        <div className=''>
                            <form className='flex flex-col justify-between relative' onSubmit={handleSubmit3(onSubmit3)}>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label my-2">
                                        <span className="label-text">Patient Wallet Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wallet Address"
                                        className="input input-bordered w-full max-w-xs p-2 rounded-lg mt-3"
                                        {...register3("vaccineAdd", {
                                            required: {
                                                value: true,
                                                message: 'Address is Required'
                                            },
                                            pattern: {
                                                value: /^(0x)?[0-9a-fA-F]{40}$/,
                                                message: 'Invalid Ethereum address'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errorsForm3.add?.type === 'required' && <span className="label-text-alt text-red-500">{errorsForm3.add?.message}</span>}
                                    </label>
                                </div>
                                <input className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-40 max-w-xs ml-40' type="submit" value="VACCINATE" />
                            </form>
                        </div>

                    </div>
                </div>
                {/* 
                ADD ADMIN FORM
                */}
                <div className='shadow-xl bg-slate-100 p-5 rounded-xl'>
                    <AddAdmin></AddAdmin>
                </div>
            </div>
        </div>

    );
};

export default AdminDashboard;