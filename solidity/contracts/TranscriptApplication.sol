pragma solidity ^0.4.24;

contract TranscriptApplication {
    address transcriptOwner;    // Student who applied for the transcript
    string transcriptHash;      // IPFS hash of the transcript document
    address providingAuthority; // Authority who provides the transcript hash
    address verifyingAuthority; // Authority who created/verified the transcript
    bool verified;              // Whether transcripts have been verified

    constructor (address provAddress, address authAddress) 
        public 
    {
        transcriptHash = "Not set";
        transcriptOwner = msg.sender;
        providingAuthority = provAddress;
        verifyingAuthority = authAddress;
        verified = false;
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

    function verify () 
        public 
    {
        if(msg.sender == verifyingAuthority && keccak256(abi.encodePacked(transcriptHash)) != keccak256("Not set")) {
            verified = true;
        }
    }

    function isVerified () 
        public 
        view 
        returns (bool) 
    {
        return verified;
    }

    function setTranscriptHash (string s) 
        public 
    {
        // Only designated address can set the hash
        if(msg.sender != providingAuthority) {
            return;
        }
        transcriptHash = s;
        // If transcript hash gets changed, it needs to be verified again
        verified = false;
    }
}
