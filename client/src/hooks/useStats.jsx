import { useState, useEffect } from "react";

export const useStats = (users, totalDays) => {
    const [deathRate, setDeathRate] = useState(0);
    const [highestPatientDistrict, setHighestPatientDistrict] = useState("");
    const [medianAgeByDistrict, setMedianAgeByDistrict] = useState({});
    const [ageGroupPercentages, setAgeGroupPercentages] = useState({});
    // console.log("Patients and Days in HOOK", users, totalDays);
    const calculateDeathRate = () => {
        const deadUsers = users.filter((user) => user.is_dead).length;
        const deathRate = deadUsers / totalDays;
        setDeathRate(deathRate);
    };

    const calculateHighestPatientDistrict = () => {
        const districtPatientCount = {};

        users.forEach((user) => {
            const district = user.district;
            if (districtPatientCount[district]) {
                districtPatientCount[district]++;
            } else {
                districtPatientCount[district] = 1;
            }
        });

        let maxDistrict = Object.keys(districtPatientCount)[0];
        let maxCount = districtPatientCount[maxDistrict];

        for (const district in districtPatientCount) {
            if (districtPatientCount[district] > maxCount) {
                maxDistrict = district;
                maxCount = districtPatientCount[district];
            }
        }

        setHighestPatientDistrict(maxDistrict);
    };

    const calculateMedianAge = () => {
        const usersByDistrict = {};
        users.forEach((user) => {
            if (!usersByDistrict[user.district]) {
                usersByDistrict[user.district] = [];
            }
            usersByDistrict[user.district].push(user);
        });

        const medianAgeByDistrict = {};
        for (const district in usersByDistrict) {
            const ages = usersByDistrict[district].map((user) => Number(user.age));
            ages.sort((a, b) => a - b);

            let medianAge;
            // console.log("DISTRICT-", district, "AGES", ages);
            if (ages.length % 2 === 0) {
                medianAge =
                    (ages[Math.floor(ages.length / 2) - 1] + ages[ages.length / 2]) / 2;
            } else {
                medianAge = ages[(ages.length - 1) / 2];
            }

            medianAgeByDistrict[district] = medianAge;
        }

        setMedianAgeByDistrict(medianAgeByDistrict);
    };

    const calculateAgeGroupPercentages = () => {
        const ageGroups = {
            Children: 0,
            Teenagers: 0,
            Young: 0,
            Elder: 0,
        };

        users.forEach((user) => {
            if (user.age < 13) {
                ageGroups["Children"]++;
            } else if (user.age < 20) {
                ageGroups["Teenagers"]++;
            } else if (user.age < 50) {
                ageGroups["Young"]++;
            } else {
                ageGroups["Elder"]++;
            }
        });

        for (const ageGroup in ageGroups) {
            ageGroups[ageGroup] = Number(
                (
                    (ageGroups[ageGroup] /
                        users.length) *
                    100
                ).toFixed(2)
            );
        }

        setAgeGroupPercentages(ageGroups);
    };

    useEffect(() => {
        if (users.length > 0) {
            calculateDeathRate();
            calculateHighestPatientDistrict();
            calculateMedianAge();
            calculateAgeGroupPercentages();
        }
    }, [users, totalDays]);

    return {
        deathRate,
        highestPatientDistrict,
        medianAgeByDistrict,
        ageGroupPercentages,
    };
};