import React from 'react';
import { useForm } from 'react-hook-form';

const AddAdmin = () => {
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
    const onSubmit = data => {
        console.log(data);
    }
    return (
        <div className='shadow-lg p-10'>
            <h1 className='text-primary font-semibold text-center'>ADD ADMIN</h1>
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
                                }
                            })}
                        />
                        <label className="label">
                            {errors.brand?.type === 'required' && <span className="label-text-alt text-red-500">{errors.brand?.message}</span>}
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
                            {...register("age", { min: 1, max: 129 }, {
                                required: {
                                    value: true,
                                    message: 'Age is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.model?.type === 'required' && <span className="label-text-alt text-red-500">{errors.model?.message}</span>}
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
                            {errors.type?.type === 'required' && <span className="label-text-alt text-red-500">{errors.type?.message}</span>}
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
                            {errors.type?.type === 'required' && <span className="label-text-alt text-red-500">{errors.type?.message}</span>}
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
                            <option value='not_vaccinated'>Not Vaccinated</option>
                            <option value='one_dose'>One Dose</option>
                            <option value='two_dose'>Two Dose</option>
                        </select>
                        <label className="label">
                            {errors.type?.type === 'required' && <span className="label-text-alt text-red-500">{errors.type?.message}</span>}
                        </label>
                    </div>
                    <input className='btn btn-slate-400 w-full max-w-xs' type="submit" value="SUBMIT" />
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;