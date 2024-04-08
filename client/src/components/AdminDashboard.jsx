import React from 'react';
import { useForm } from 'react-hook-form';
import AddAdmin from './AddAdmin';
const AdminDashboard = ({ myContract, connectedAcc }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onDeathCerSubmit = data => {
        console.log(data.add)
    }
    const onDeathCerCancelSubmit = data => {
        console.log(data.add)
    }
    const onVaccinateSubmit = data => {
        console.log(data.add)
    }
    return (

        <div className='bg-gray-200 shadow-lg p-6 rounded-lg'>
            <h1 className='text-lg font-semibold text-center'>ADMIN DASHBOARD</h1>
            <div className='flex flex-col align-middle justify-center'>
                <div className='flex justify-between flex-wrap'>
                    <div className='my-5'>
                        <h1 className='text-sm font-semibold'>ISSUE DEATH CERTIFICATE</h1>
                        <div className=''>
                            <form className='flex flex-col justify-between relative ' onSubmit={handleSubmit(onDeathCerSubmit)}>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label my-2">
                                        <span className="label-text">Patient Wallet Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wallet Address"
                                        className="input input-bordered w-full max-w-xs p-2 rounded-lg mt-3"
                                        {...register("add", {
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
                                        {errors.add?.type === 'required' && <span className="label-text-alt text-red-500">{errors.add?.message}</span>}
                                    </label>
                                </div>
                                <input className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-40 max-w-xs ml-40' type="submit" value="ISSUE" />
                            </form>
                        </div>
                    </div>
                    {/* 
                    CANCEL DEATH CERTIFICATE
                    */}
                    <div className='my-5'>
                        <h1 className='text-sm font-semibold'>CANCEL DEATH CERTIFICATE</h1>
                        <div className=''>
                            <form className='flex flex-col justify-between relative' onSubmit={handleSubmit(onDeathCerCancelSubmit)}>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label my-2">
                                        <span className="label-text">Patient Wallet Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wallet Address"
                                        className="input input-bordered w-full max-w-xs p-2 rounded-lg mt-3"
                                        {...register("add", {
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
                                        {errors.add?.type === 'required' && <span className="label-text-alt text-red-500">{errors.add?.message}</span>}
                                    </label>
                                </div>
                                <input className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-40 max-w-xs ml-40' type="submit" value="CANCEL" />
                            </form>
                        </div>

                    </div>
                    {/* 
                    VACCINATE PATIENT
                    */}
                    <div className='my-5'>
                        <h1 className='text-sm font-semibold'>VACCINATE PATIENTS</h1>
                        <div className=''>
                            <form className='flex flex-col justify-between relative' onSubmit={handleSubmit(onVaccinateSubmit)}>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label my-2">
                                        <span className="label-text">Patient Wallet Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wallet Address"
                                        className="input input-bordered w-full max-w-xs p-2 rounded-lg mt-3"
                                        {...register("add", {
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
                                        {errors.add?.type === 'required' && <span className="label-text-alt text-red-500">{errors.add?.message}</span>}
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
                <div>
                    <AddAdmin></AddAdmin>
                </div>
            </div>
        </div>

    );
};

export default AdminDashboard;