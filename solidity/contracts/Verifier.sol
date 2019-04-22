pragma solidity ^0.5.0;

contract Verifier {

    event SignedMessage (
        address sender,
        uint256 nonce
    );

    function signMessage (uint256 nonce)
        public
    {
        emit SignedMessage(msg.sender, nonce);
    }

}