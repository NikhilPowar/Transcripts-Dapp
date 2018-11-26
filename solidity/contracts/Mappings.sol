pragma solidity ^0.5.0;

contract Colleges{
    
    struct Student{
        string Name;
        string ID;
        string password;
        address account;
        address College;      
    } 

    struct College{
        string Name;
        string email;
        address account;
    }

    mapping(address => College)  public Collegelist;
    address[] public College_accts;

    mapping (address => Student) public Studentlist;
    address[] public Student_accts;

    constructor () public {
        setCollege(0x3F18ae60B8cCd7a4A1087ae635a869944357D00f,"IIT-B","iitb@gmail.com");
        setCollege(0x7467A9383cEF730A2A95Fda45f6d93ec2CED7831,"VJTI","vjti@gmail.com");
    }

    function setCollege (address _address, string memory name, string memory email) public {
        College storage newCollege = Collegelist[_address];

        newCollege.Name = name;
        newCollege.email = email;
        newCollege.account = _address;
    
        College_accts.push(_address) - 1;

    }
    
    function addStudent (address _address,string memory name, string memory ID, string memory password, address college) public
    {
        Student storage newStudent = Studentlist[_address];
        newStudent.Name = name;
        newStudent.ID = ID;
        newStudent.password = password;
        newStudent.College = college;
        newStudent.account = _address;
        Student_accts.push(_address) - 1;
    }

    function getColleges() public view returns (address[] memory) {
        return College_accts;
    }
    
    function getCollege(address ins) public view returns (string memory, string memory) {
        return (Collegelist[ins].Name, Collegelist[ins].email);
    }
    
    function countCollegess() public view returns (uint) {
        return College_accts.length;
    }
    
    
}