import React from 'react';

const CovidTrends = () => {
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
                                <th className='outline'>3</th>
                                <td className='outline'>Dhaka</td>
                                <td className='outline'>25</td>
                                <td className='outline'>25</td>
                                <td className='outline'>25</td>
                                <td className='outline'>25</td>
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
                            <tr>
                                <th className='outline'>3</th>
                                <td className='outline'>Dhaka</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default CovidTrends;