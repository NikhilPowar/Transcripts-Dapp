pragma solidity ^0.5.0;

contract TranscriptApplication {
    address transcriptOwner;    // Student who applied for the transcript
    string transcriptHash;      // IPFS hash of the transcript document
    address providingAuthority; // Authority who provides the transcript hash

    // Student Details
    string name;
    string id;
    string courseName;
    bytes4 courseStartYear;
    bytes4 courseCompletionYear;

    constructor (address _owner, address _provider, string memory _name, string memory _id, 
                 string memory _courseName, bytes4 _startYear, bytes4 _completionYear) 
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
        returns (string memory) 
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

    function setTranscriptHash (string memory s) 
        public 
        returns (string memory)
    {
        // Only designated address can set the hash
        if(msg.sender != providingAuthority) {
            return "Error";
        }
        transcriptHash = s;
        return "Success";
    }
}
