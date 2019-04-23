pragma solidity ^0.5.0;

contract TranscriptApplication {
    address transcriptOwner;    // Student who applied for the transcript
    struct TranscriptHash {     // IPFS hash of the transcript document
        bytes32 _hash;
        uint8 _hash_function;
        uint8 _size;
    }
    TranscriptHash transcriptHash;
    address providingAuthority; // Authority who provides the transcript hash

    // Student Details
    bytes32 public name;
    bytes32 public id;
    bytes32 public courseName;
    uint public courseStartYear;
    uint public courseCompletionYear;

    event TranscriptApplicationCreated (
        address owner,
        address provider,
        bytes32 name,
        bytes32 id,
        bytes32 courseName,
        uint startYear,
        uint completionYear
    );

    event TranscriptHashSet (
        address collegeAddress,
        bytes32 transcriptHashValue,
        uint8 transcriptHashFunction,
        uint8 transcriptHashSize
    );

    constructor (address _owner, address _provider, bytes32 _name, bytes32 _id, 
                 bytes32 _courseName, uint _startYear, uint _completionYear) 
        public 
    {
        transcriptHash._hash = "Not set";
        transcriptHash._hash_function = 0;
        transcriptHash._size = 0;
        transcriptOwner = _owner;
        providingAuthority = _provider;
        name = _name;
        id = _id;
        courseName = _courseName;
        courseStartYear = _startYear;
        courseCompletionYear = _completionYear;
        emit TranscriptApplicationCreated(_owner, _provider, _name, _id, _courseName, _startYear, _completionYear);
    }

    function getTranscriptHashValue () 
        public 
        view 
        returns (bytes32) 
    {
        return transcriptHash._hash;
    }

    function getTranscriptHashFunction ()
        public
        view
        returns (uint8)
    {
        return transcriptHash._hash_function;
    }

    function getTranscriptHashSize ()
        public
        view
        returns (uint8)
    {
        return transcriptHash._size;
    }

    function getTranscriptOwner () 
        public 
        view 
        returns (address) 
    {
        return transcriptOwner;
    }

    function setTranscriptHash (bytes32 hashValue, uint8 func, uint8 size) 
        public 
        returns (bytes32)
    {
        // Only designated address can set the hash
        if(msg.sender != providingAuthority) {
            return "Error";
        }
        transcriptHash._hash = hashValue;
        transcriptHash._hash_function = func;
        transcriptHash._size = size;
        emit TranscriptHashSet (msg.sender, hashValue, func, size);
        return "Success";
    }
}
