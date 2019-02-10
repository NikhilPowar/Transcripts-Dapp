pragma solidity^0.5.0;

import "./KeyHolder.sol";
import "./TranscriptApplication.sol";

contract ContractFactory {
    event IdentityContractCreated(
        address creator
    );

    event TranscriptApplicationContractCreated(
        address creator,
        address owner,
        address provider,
        string name,
        string id,
        string courseName,
        uint startYear,
        uint completionYear
    );

    function createIdentityContract()
    public
    returns (address idContractAddress)
    {
        idContractAddress = address(new KeyHolder());
        emit IdentityContractCreated(msg.sender);
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
        emit TranscriptApplicationContractCreated(msg.sender, owner, provider, name, id, courseName, startYear, completionYear);
        return transcriptApplicationAddress;
    }
}