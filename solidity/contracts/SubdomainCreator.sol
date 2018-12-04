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

    function register (bytes memory data)
		public
        returns (bool)
	{
        address registrar = 0x112234455C3a32FD11230C42E7Bccd4A84e02010;
        bool success;
        bytes memory dummy_data;
        (success, dummy_data) = registrar.call(data);
        return success;
    }

    function adminRegister (bytes memory data)
        public
        returns (bool)
    {
        if (msg.sender != 0x8e18047d6D8c17BC48dFC8c22A49F59DBFc73643) {
            return false;
        }
        return register(data);
    }
}