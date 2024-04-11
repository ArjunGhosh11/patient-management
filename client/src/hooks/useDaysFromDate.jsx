import { useState, useEffect } from 'react';
const useDaysFromDate = () => {
    const [days, setDays] = useState(0);

    useEffect(() => {
        const currentDate = new Date();
        const fixedDateObj = new Date('April 7, 2024');

        // Calculate the difference in milliseconds
        const differenceMs = currentDate - fixedDateObj;

        // Convert milliseconds to days and take the absolute value
        const differenceDays = Math.abs(Math.floor(differenceMs / (1000 * 60 * 60 * 24)));

        setDays(differenceDays);
    }, []);

    return days;
};

export default useDaysFromDate;