pragma solidity^0.5.0;

import "./KeyHolder.sol";
import "./TranscriptApplication.sol";

contract ContractFactory {
    event IdentityContractCreated(
        address creator,
        address idContractAddress
    );

    event TranscriptApplicationContractCreated(
        address creator,
        address owner,
        address provider,
        string name,
        string id,
        string courseName,
        uint startYear,
        uint completionYear,
        address applicationAddress
    );

    function createIdentityContract()
    public
    returns (address idContractAddress)
    {
        idContractAddress = address(new KeyHolder(msg.sender));
        emit IdentityContractCreated(msg.sender, idContractAddress);
        return idContractAddress;
    }

    function createTranscriptApplicationContract(
        address owner, 
        address provider, 
        string memory name, 
        string memory id, 
        string memory courseName, 
        uint startYear, 
        uint completionYear)
    public
    returns (address transcriptApplicationAddress)
    {
        transcriptApplicationAddress = address(new TranscriptApplication(owner, provider, name, id, courseName, startYear, completionYear));
        emit TranscriptApplicationContractCreated(msg.sender, owner, provider, name, id, courseName, startYear, completionYear, transcriptApplicationAddress);
        return transcriptApplicationAddress;
    }
}