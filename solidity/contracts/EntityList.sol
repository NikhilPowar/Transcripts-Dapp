pragma solidity ^0.5.0;

contract EntityList {

    struct ProvidingAuthority {
        string name;
        address addr;
    }
    address[] public admins;
    ProvidingAuthority[] public providingAuthorities;

    constructor ()
        public
    {
        admins.push(msg.sender);
    }

    function toString(address x) 
        private
        returns (string memory) 
    {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++) {
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        }
        return string(b);
    }

    function validateAdmin(address addr)
        private
        returns (bool)
    {
        for (uint i = 0; i < admins.length; i++) {
            if (admins[i] == addr) {
                return true;
            }
            return false;
        }
    }

    function addAdmin (address addr)
        public
        returns (string memory)
    {
        if(!validateAdmin(msg.sender)) {
            return "Error";
        }
        admins.push(addr);
        return "Success";
    }

    function addProvidingAuthority (string memory name, address addr)
        public
        returns (string memory)
    {
        if (!validateAdmin(msg.sender)) {
            return "Error";
        }
        providingAuthorities.push(ProvidingAuthority(name, addr));
        return "Success";
    }

    function removeProvidingAuthority (address addr)
        public
        returns (string memory)
    {
        if (!validateAdmin(msg.sender)) {
            return "Error";
        }
        for (uint i = 0; i < providingAuthorities.length; i++) {
            if (providingAuthorities[i].addr == addr) {
                delete providingAuthorities[i];
                return "Success";
            }
        }
        return "Error";
    }

    function getProvidingAuthoritiesLength ()
        public
        view
        returns (uint)
    {
        return providingAuthorities.length;
    }

    function getAdminsLength ()
        public
        view
        returns (uint)
    {
        return admins.length;
    }
}