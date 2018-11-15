pragma solidity ^0.4.18;

contract SignUp{
    
   struct user{
        string Name;
        string DOB;
        string College;
        string CollegeID;
        string email;
    }

    mapping(address => user)  public userlist;
    address[] public user_accts;

    function setUser(address _address, string name, string dob, string college, string collegeID, string email) public {
        var newuser = userlist[_address];

        newuser.Name = name;
        newuser.DOB=dob;
        newuser.College=college;
        newuser.CollegeID=collegeID;
        newuser.email=email;
    
        user_accts.push(_address) -1;

    }
    
    
    function geUsers() view public returns (address[]) {
        return user_accts;
    }
    
    function getUser(address ins) view public returns (string, string, string, string,string) {
        return (userlist[ins].Name, userlist[ins].DOB, userlist[ins].College, userlist[ins].CollegeID,userlist[ins].email);
    }
    
    function countUsers() view public returns (uint) {
        return user_accts.length;
    }
    
    
}