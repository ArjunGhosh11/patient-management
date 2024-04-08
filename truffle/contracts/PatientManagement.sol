// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

error NotAdmin();

contract PatientManagement {
    address public immutable i_admin;

    enum VaccineStatus {
        not_vaccinated,
        one_dose,
        two_dose
    }

    struct Person {
        address add;
        uint256 id;
        uint256 age;
        string gender;
        VaccineStatus vaccine_status;
        string district;
        string symptoms_details;
        bool is_dead;
        bool is_admin;
    }

    address[] public List_Of_Patients;
    address[] public List_Of_Admins;
    address[] public deceasedPeople;
    mapping(string => uint256[]) public districtDeath;
    mapping(string => uint256[]) public districtPatient;
    mapping(uint256 => Person) public idToPerson;
    mapping(address => Person) public addressToPerson;
    mapping(string => uint256) public ageGroupCount;
    uint256 public patientCount;
    uint256 public adminCount;

    constructor() {
        i_admin = msg.sender;
        patientCount = 0;
        adminCount = 0;
        List_Of_Admins.push(i_admin);
        idToPerson[patientCount] = Person(
            i_admin,
            patientCount,
            23,
            "male",
            VaccineStatus.two_dose,
            "Tangail",
            "No SYmptoms",
            false,
            true
        );
        addressToPerson[i_admin] = Person(
            i_admin,
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
        address _add,
        uint256 _age,
        string memory _gender,
        VaccineStatus _vaccineStatus,
        string memory _district,
        string memory _symptomsDetails
    ) public returns (uint256) {
        patientCount++;
        List_Of_Patients.push(_add);
        idToPerson[patientCount] = Person(
            _add,
            patientCount,
            _age,
            _gender,
            _vaccineStatus,
            _district,
            _symptomsDetails,
            false,
            false
        );
        addressToPerson[_add] = Person(
            _add,
            patientCount,
            _age,
            _gender,
            _vaccineStatus,
            _district,
            _symptomsDetails,
            false,
            false
        );
        if (_age < 13) {
            ageGroupCount["children"] += 1;
        } else if (_age >= 13 && _age < 20) {
            ageGroupCount["teenager"] += 1;
        } else if (_age >= 20 && _age < 50) {
            ageGroupCount["young"] += 1;
        } else {
            ageGroupCount["elder"] += 1;
        }
        districtPatient[_district].push(patientCount);
        return patientCount;
    }

    function addAdmin(
        address _add,
        uint256 _age,
        string memory _gender,
        VaccineStatus _vaccineStatus,
        string memory _district,
        string memory _symptomsDetails
    ) public onlyadmin returns (uint256) {
        adminCount++;
        List_Of_Admins.push(_add);
        idToPerson[patientCount] = Person(
            _add,
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
    function getPatientByAddress(
        address _add
    ) public view returns (Person memory) {
        return addressToPerson[_add];
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

    function issueDeathCertificate(address _add) public onlyadmin {
        // Check if the person exists
        // Update the person's status in the mapping
        addressToPerson[_add].is_dead = true;
        districtDeath[addressToPerson[_add].district].push(
            addressToPerson[_add].id
        );
        deceasedPeople.push(_add);
    }

    modifier onlyadmin() {
        require(msg.sender == i_admin, "Not authorized");
        _;
    }
}
