// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

error PatientNotFound();
error UserAlreadyExists();

contract PatientManagement {
    address public immutable i_admin;
    event patientAdded(
        address indexed _add,
        uint256 indexed age,
        string district
    );
    event patientUpdated(
        address indexed _add,
        uint indexed age,
        string district,
        // VaccineStatus vaccineStatus,
        bool is_dead
    );

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
    // address[] public deceasedPeople;
    // mapping(string => uint256[]) public districtDeath;
    // mapping(string => uint256[]) public districtPatient;
    // mapping(uint256 => Person) public idToPerson;
    mapping(address => Person) public addressToPerson;
    // mapping(string => uint256) public ageGroupCount;
    uint256 public patientCount;
    uint256 public adminCount;

    constructor() {
        i_admin = msg.sender;
        patientCount = 0;
        adminCount = 0;
        List_Of_Admins.push(i_admin);
        // idToPerson[patientCount] = Person(
        //     i_admin,
        //     patientCount,
        //     23,
        //     "male",
        //     VaccineStatus.two_dose,
        //     "Tangail",
        //     "No SYmptoms",
        //     false,
        //     true
        // );
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

    function addPatient(
        address _add,
        uint256 _age,
        string memory _gender,
        VaccineStatus _vaccineStatus,
        string memory _district,
        string memory _symptomsDetails
    ) public {
        if (addressToPerson[_add].id != 0) {
            revert UserAlreadyExists();
        }
        patientCount++;
        List_Of_Patients.push(_add);
        // idToPerson[patientCount] = Person(
        //     _add,
        //     patientCount,
        //     _age,
        //     _gender,
        //     _vaccineStatus,
        //     _district,
        //     _symptomsDetails,
        //     false,
        //     false
        // );
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
        emit patientAdded(_add, _age, _district);
        // if (_age < 13) {
        //     ageGroupCount["children"] += 1;
        // } else if (_age >= 13 && _age < 20) {
        //     ageGroupCount["teenager"] += 1;
        // } else if (_age >= 20 && _age < 50) {
        //     ageGroupCount["young"] += 1;
        // } else {
        //     ageGroupCount["elder"] += 1;
        // }
        // districtPatient[_district].push(patientCount);
        // return patientCount;
    }

    function addAdmin(
        address _add,
        uint256 _age,
        string memory _gender,
        VaccineStatus _vaccineStatus,
        string memory _district,
        string memory _symptomsDetails
    ) public onlyadmin {
        if (addressToPerson[_add].id != 0) {
            revert UserAlreadyExists();
        }
        adminCount++;
        List_Of_Admins.push(_add);
        addressToPerson[_add] = Person(
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
        // return adminCount;
    }

    // function getPatientById(uint256 _id) public view returns (Person memory) {
    //     return idToPerson[_id];
    // }
    function getUserByAddress(
        address _add
    ) public view returns (Person memory) {
        return addressToPerson[_add];
    }

    // function getPatientByDistrict(
    //     string memory _district
    // ) public view returns (uint256[] memory) {
    //     return districtPatient[_district];
    // }

    // function getDeadPeopleByDistrict(
    //     string memory _district
    // ) public view returns (uint256[] memory) {
    //     return districtDeath[_district];
    // }

    function vaccinate(address _add) public onlyadmin returns (string memory) {
        if (addressToPerson[_add].id == 0) {
            revert PatientNotFound();
        }
        VaccineStatus currentStatus = addressToPerson[_add].vaccine_status;
        if (currentStatus == VaccineStatus.not_vaccinated) {
            addressToPerson[_add].vaccine_status = VaccineStatus.one_dose;
            emit patientUpdated(
                _add,
                addressToPerson[_add].age,
                addressToPerson[_add].district,
                addressToPerson[_add].is_dead
            );
            return "Vaccinated first dose";
        } else if (currentStatus == VaccineStatus.one_dose) {
            addressToPerson[_add].vaccine_status = VaccineStatus.two_dose;
            emit patientUpdated(
                _add,
                addressToPerson[_add].age,
                addressToPerson[_add].district,
                addressToPerson[_add].is_dead
            );
            return "Vaccinated second dose";
        } else {
            return "Already fully vaccinated";
        }
    }

    function issueDeathCertificate(address _add) public onlyadmin {
        // Check if the person exists
        if (addressToPerson[_add].id == 0) {
            revert PatientNotFound();
        }
        // Update the person's status in the mapping
        addressToPerson[_add].is_dead = true;
        emit patientUpdated(
            _add,
            addressToPerson[_add].age,
            addressToPerson[_add].district,
            addressToPerson[_add].is_dead
        );
        // districtDeath[addressToPerson[_add].district].push(
        //     addressToPerson[_add].id
        // );
        // deceasedPeople.push(_add);
    }
    function cancelDeathCertificate(address _add) public onlyadmin {
        // Check if the person exists

        // Update the person's status in the mapping
        addressToPerson[_add].is_dead = false;
        emit patientUpdated(
            _add,
            addressToPerson[_add].age,
            addressToPerson[_add].district,
            addressToPerson[_add].is_dead
        );
    }

    modifier onlyadmin() {
        uint flag = 0;
        for (uint i; i < List_Of_Admins.length; i++) {
            if (msg.sender == List_Of_Admins[i]) {
                flag = 1;
            }
        }
        require(flag == 1, "Not authorized");
        _;
    }
}
