import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddPatients = ({ myContract, connectedAcc }) => {
    // console.log(myContract);

    const bangladeshDistricts = [
        "Bagerhat",
        "Bandarban",
        "Barguna",
        "Barisal",
        "Bhola",
        "Bogra",
        "Brahmanbaria",
        "Chandpur",
        "Chapainawabganj",
        "Chittagong",
        "Chuadanga",
        "Comilla",
        "Cox's Bazar",
        "Dhaka",
        "Dinajpur",
        "Faridpur",
        "Feni",
        "Gaibandha",
        "Gazipur",
        "Gopalganj",
        "Habiganj",
        "Jamalpur",
        "Jessore",
        "Jhalokati",
        "Jhenaidah",
        "Joypurhat",
        "Khagrachari",
        "Khulna",
        "Kishoreganj",
        "Kurigram",
        "Kushtia",
        "Lakshmipur",
        "Lalmonirhat",
        "Madaripur",
        "Magura",
        "Manikganj",
        "Meherpur",
        "Moulvibazar",
        "Munshiganj",
        "Mymensingh",
        "Naogaon",
        "Narail",
        "Narayanganj",
        "Narsingdi",
        "Natore",
        "Netrokona",
        "Nilphamari",
        "Noakhali",
        "Pabna",
        "Panchagarh",
        "Patuakhali",
        "Pirojpur",
        "Rajbari",
        "Rajshahi",
        "Rangamati",
        "Rangpur",
        "Satkhira",
        "Shariatpur",
        "Sherpur",
        "Sirajganj",
        "Sunamganj",
        "Sylhet",
        "Tangail",
        "Thakurgaon"
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    //######ADD PATIENTS########
    const onSubmit = data => {
        // console.log(data);
        myContract.methods.addPatient(
            data.add,
            data.age,
            data.gender,
            data.vaccineStatus,
            data.district,
            data.symptoms
        ).send({ from: connectedAcc || "", gas: 6000000 })
            .then(() => {
                console.log("PATIENT ADDED");
            })
            .catch((err) => {
                console.error(err.message);
            })

    }
    const [value, setValue] = useState({});
    const getValue = async (myContract, connectedAcc) => {
        try {
            const result = await myContract.methods.getPatientById(1).call(); // Call your view function
            console.log(result);
            // Update state with the result
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <div className='shadow-xl p-10 bg-slate-500'>
            <h1 className='text-primary font-semibold text-center text-l'>ADD PATIENT</h1>
            <div className='w-full flex justify-center align-middle'>
                <form className='flex flex-col justify-between' onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label my-2">
                            <span className="label-text">Wallet Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Wallet Address"
                            className="input input-bordered w-full max-w-xs"
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

                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label my-2">
                            <span className="label-text">Age</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Age"
                            className="input input-bordered w-full max-w-xs"
                            {...register("age", {
                                required: {
                                    value: true,
                                    message: 'Age is Required'
                                },
                                min: { value: 1, message: 'Age must be at least 1' },
                                max: { value: 130, message: 'Age must be at most 130' }
                            })}
                        />
                        <label className="label">
                            {errors.age?.type === 'required' && <span className="label-text-alt text-red-500">{errors.age?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label mr-5">
                            <span className="label-text">District</span>
                        </label>
                        <select defaultValue='Dhaka' className="select select-bordered"
                            {...register("district", {
                                required: {
                                    value: true,
                                    message: 'Type is Required'
                                }
                            })}>
                            {
                                bangladeshDistricts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))
                            }
                        </select>
                        <label className="label">
                            {errors.district?.type === 'required' && <span className="label-text-alt text-red-500">{errors.district?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label mr-5">
                            <span className="label-text">Gender</span>
                        </label>
                        <select defaultValue='Male' className="select select-bordered"
                            {...register("gender", {
                                required: {
                                    value: true,
                                    message: 'Type is Required'
                                }
                            })}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='others'>Others</option>
                        </select>
                        <label className="label">
                            {errors.gender?.type === 'required' && <span className="label-text-alt text-red-500">{errors.gender?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label my-2">
                            <span className="label-text">Symptoms</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Symptoms"
                            className="input input-bordered w-full max-w-xs"
                            {...register("symptoms", {
                                required: {
                                    value: true,
                                    message: 'Symptoms is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.symptoms?.type === 'required' && <span className="label-text-alt text-red-500">{errors.symptoms?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label mr-5">
                            <span className="label-text">Vaccine Status</span>
                        </label>
                        <select defaultValue='None' className="select select-bordered"
                            {...register("vaccineStatus", {
                                required: {
                                    value: true,
                                    message: 'Vaccine Status is Required'
                                }
                            })}>
                            <option value={0} >Not Vaccinated</option>
                            <option value={1}>One Dose</option>
                            <option value={2}>Two Dose</option>
                        </select>
                        <label className="label">
                            {errors.vaccineStatus?.type === 'required' && <span className="label-text-alt text-red-500">{errors.vaccineStatus?.message}</span>}
                        </label>
                    </div>
                    <input className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full max-w-xs' type="submit" value="SUBMIT" />
                    <button onClick={() => getValue(myContract, connectedAcc)}>Get Value</button>
                </form>
            </div>
        </div>
    );
};

export default AddPatients;