pragma solidity ^0.4.24;

contract TranscriptApplication {
    address transcriptOwner;    // Student who applied for the transcript
    string transcriptHash;      // IPFS hash of the transcript document
    address providingAuthority; // Authority who provides the transcript hash

    constructor (address id, address provAddress) 
        public 
    {
        transcriptHash = "Not set";
        transcriptOwner = id;
        providingAuthority = provAddress;
    }

    function getTranscriptHash () 
        public 
        view 
        returns (string) 
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

    function setTranscriptHash (string s) 
        public 
        returns (string)
    {
        // Only designated address can set the hash
        if(msg.sender != providingAuthority) {
            return "Error";
        }
        transcriptHash = s;
        return "Success";
    }
}
