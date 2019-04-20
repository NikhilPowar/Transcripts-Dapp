pragma solidity ^0.5.0;

contract TranscriptApplication {
    address transcriptOwner;    // Student who applied for the transcript
    bytes32 transcriptHash;      // IPFS hash of the transcript document
    address providingAuthority; // Authority who provides the transcript hash

    // Student Details
    bytes32 public name;
    bytes32 public id;
    bytes32 public courseName;
    uint public courseStartYear;
    uint public courseCompletionYear;

    constructor (address _owner, address _provider, bytes32 _name, bytes32 _id, 
                 bytes32 _courseName, uint _startYear, uint _completionYear) 
        public 
    {
        transcriptHash = "Not set";
        transcriptOwner = _owner;
        providingAuthority = _provider;
        name = _name;
        id = _id;
        courseName = _courseName;
        courseStartYear = _startYear;
        courseCompletionYear = _completionYear;
    }

    function getTranscriptHash () 
        public 
        view 
        returns (bytes32) 
    {
        return transcriptHash;
    }

    function getTranscriptOwner () 
        public 
        view 
        returns (address) 
    {
        return transcriptOwner;
    }

    function setTranscriptHash (bytes32 s) 
        public 
        returns (bytes32)
    {
        // Only designated address can set the hash
        if(msg.sender != providingAuthority) {
            return "Error";
        }
        transcriptHash = s;
        return "Success";
    }
}
