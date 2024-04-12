import React from 'react';
import { useParams } from 'react-router-dom';

const DeathCertificate = () => {
    const { address } = useParams()
    return (
        <div>
            <h1 className='font-bold text-xl text-center'>DEATH CERTIFICATE OF Patient with ADDRESS: {address}</h1>
        </div>
    );
};

export default DeathCertificate;