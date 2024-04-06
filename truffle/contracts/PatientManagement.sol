// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

error NotAdmin();

contract PatientManagement {
    address public immutable i_admin;

    enum VaccineStatus {
        not_vaccinated,
        one_dose,
        two_dose
    }

    struct Person {
        uint256 id;
        uint256 age;
        string gender;
        VaccineStatus vaccine_status;
        string district;
        string symptoms_details;
        bool is_dead;
        bool is_admin;
    }

    uint256[] public List_Of_Patients;
    uint256[] public List_Of_Admins;
    uint256[] public deceasedPeople;
    mapping(string => uint256[]) public districtDeath;
    mapping(string => uint256[]) public districtPatient;
    mapping(uint256 => Person) public idToPerson;
    uint256 public patientCount;
    uint256 public adminCount;

    constructor() {
        i_admin = msg.sender;
        patientCount = 0;
        adminCount = 0;
        List_Of_Admins.push(adminCount);
        idToPerson[patientCount] = Person(
            patientCount,
            23,
            "male",
            VaccineStatus.two_dose,
            "Tangail",
            "No SYmptoms",
            false,
            true
        );
    }
    function getAddress() public view returns (address) {
        return i_admin;
    }

    function quickSort(uint256[] memory arr, int256 left, int256 right) public {
        int256 i = left;
        int256 j = right;
        if (i == j) return;
        uint256 pivot = arr[uint256(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint256(i)] > pivot) i++;
            while (pivot > arr[uint256(j)]) j--;
            if (i <= j) {
                (arr[uint256(i)], arr[uint256(j)]) = (
                    arr[uint256(j)],
                    arr[uint256(i)]
                );
                i++;
                j--;
            }
        }
        if (left < j) quickSort(arr, left, j);
        if (i < right) quickSort(arr, i, right);
    }

    function addPatient(
        uint256 _age,
        string memory _gender,
        VaccineStatus _vaccineStatus,
        string memory _district,
        string memory _symptomsDetails
    ) public returns (uint256) {
        patientCount++;
        List_Of_Patients.push(patientCount);
        idToPerson[patientCount] = Person(
            patientCount,
            _age,
            _gender,
            _vaccineStatus,
            _district,
            _symptomsDetails,
            false,
            false
        );
        districtPatient[_district].push(patientCount);
        return patientCount;
    }

    function addAdmin(
        uint256 _age,
        string memory _gender,
        VaccineStatus _vaccineStatus,
        string memory _district,
        string memory _symptomsDetails
    ) public onlyadmin returns (uint256) {
        adminCount++;
        List_Of_Admins.push(patientCount);
        idToPerson[patientCount] = Person(
            patientCount,
            _age,
            _gender,
            _vaccineStatus,
            _district,
            _symptomsDetails,
            false,
            true
        );
        return adminCount;
    }

    function getPatientById(uint256 _id) public view returns (Person memory) {
        return idToPerson[_id];
    }

    function getPatientByDistrict(
        string memory _district
    ) public view returns (uint256[] memory) {
        return districtPatient[_district];
    }

    function getDeadPeopleByDistrict(
        string memory _district
    ) public view returns (uint256[] memory) {
        return districtDeath[_district];
    }

    function vaccinate(uint256 _id) public onlyadmin returns (string memory) {
        VaccineStatus currentStatus = idToPerson[_id].vaccine_status;

        if (currentStatus == VaccineStatus.not_vaccinated) {
            idToPerson[_id].vaccine_status = VaccineStatus.one_dose;
            return "Vaccinated first dose";
        } else if (currentStatus == VaccineStatus.one_dose) {
            idToPerson[_id].vaccine_status = VaccineStatus.two_dose;
            return "Vaccinated second dose";
        } else {
            return "Already fully vaccinated";
        }
    }

    function issueDeathCertificate(uint256 _id) public onlyadmin {
        // Check if the person exists
        // Update the person's status in the mapping
        idToPerson[_id].is_dead = true;
        districtDeath[idToPerson[_id].district].push(_id);
        deceasedPeople.push(_id);
    }

    modifier onlyadmin() {
        require(msg.sender == i_admin, "Not authorized");
        _;
    }
}
