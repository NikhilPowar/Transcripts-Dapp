pragma solidity^0.5.0;

contract SubdomainCreator {

    struct Execution {
        address to;
        uint256 value;
        bytes data;
        bool executed;
    }
    uint256 executionNonce;
    mapping (uint256 => Execution) executions;

    event SubdomainCreated(
        bytes32 appname,
        bytes32 username,
        address owner,
        bytes data
    );

    function register (bytes32 appname, bytes32 username, address idContract)
		public
        returns (bool)
	{
        address registrar = 0x112234455C3a32FD11230C42E7Bccd4A84e02010;
        bool success;
        bytes memory dummy_data;
        (success, dummy_data) = registrar.call(abi.encodeWithSignature("setSubnodeOwner(bytes32,bytes32,address)", appname, username, idContract));
        if(success) {
            emit SubdomainCreated(appname, username, idContract, dummy_data);
        }
        return success;
    }

    function adminRegister (bytes32 appname, bytes32 username, address userAddress)
        public
        returns (bool)
    {
        if (msg.sender != 0x8e18047d6D8c17BC48dFC8c22A49F59DBFc73643) {
            return false;
        }
        bool success;
        address registrar = 0x112234455C3a32FD11230C42E7Bccd4A84e02010;
        bytes memory dummy_data;
        (success, dummy_data) = registrar.call(abi.encodeWithSignature("setSubnodeOwner(bytes32,bytes32,address)", appname, username, userAddress));
        if(success) {
            emit SubdomainCreated(appname, username, userAddress, dummy_data);
        }
        return success;
    }
}