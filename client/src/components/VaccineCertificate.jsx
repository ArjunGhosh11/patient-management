import React from 'react';
import { useParams } from 'react-router-dom';

const VaccineCertificate = () => {
    const { address } = useParams()
    return (
        <div>
            <h1 className='font-bold text-xl text-center'>VACCINE CERTIFICATE OF Patient with ADDRESS: {address}</h1>
        </div>
    );
};

export default VaccineCertificate;