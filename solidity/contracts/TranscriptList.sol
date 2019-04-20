pragma solidity ^0.5.0;

contract TranscriptList {

    mapping (address => address[]) transcriptList;

    event TranscriptAdded (
        address student,
        address college,
        address transcriptAddress
    );

    event TranscriptRemoved (
        address userAddress,
        address transcriptAddress
    );

    constructor () 
        public 
    { }

    function addTranscript (address student, address college, address transcriptAddress) 
        public 
    {
        transcriptList[student].push(transcriptAddress);
        transcriptList[college].push(transcriptAddress);
        emit TranscriptAdded(student, college, transcriptAddress);
    }

    function getTranscripts (address account)
        public
        view
        returns (address[] memory)
    {
        return transcriptList[account];
    }

    function removeTranscript (address senderAddress, address transcriptAddress)
        public
    {
        uint length = transcriptList[senderAddress].length;
        for (uint i = 0; i < length; i++){
            if (transcriptAddress == transcriptList[senderAddress][i]) {
                transcriptList[senderAddress][i] = transcriptList[senderAddress][length-1];
                transcriptList[senderAddress].length--;
                emit TranscriptRemoved(senderAddress, transcriptAddress);
                return;
            }
        }
    }
}
