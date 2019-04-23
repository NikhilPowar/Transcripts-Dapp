pragma solidity ^0.5.0;

contract EntityList {

    struct ProvidingAuthority {
        bytes32 name;
        address addr;
    }
    address[] public admins;
    ProvidingAuthority[] public providingAuthorities;

    event ProviderAdded (
        address addr,
        bytes32 name,
        address sender
    );

    event ProviderRemoved (
        address addr,
        address sender
    );

    event AdminAdded (
        address addr,
        address sender
    );

    event AdminRemoved (
        address addr,
        address sender
    );

    constructor ()
        public
    {
        admins.push(msg.sender);
    }

    function validateAdmin(address addr)
        private
        view
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
        returns (bytes32)
    {
        if(!validateAdmin(msg.sender)) {
            return "Error";
        }
        admins.push(addr);
        emit AdminAdded(addr, msg.sender);
        return "Success";
    }

    function removeAdmin (address addr) 
        public
        returns (bytes32) 
    {
        if(!validateAdmin(msg.sender)) {
            return "Error";
        }
        for (uint i = 0; i < admins.length; i++) {
            if (admins[i] == addr) {
                delete admins[i];
                emit AdminRemoved(addr, msg.sender);
                return "Success";
            }
        }
        return "Error";
    }

    function addProvidingAuthority (bytes32 name, address addr)
        public
        returns (bytes32)
    {
        if (!validateAdmin(msg.sender)) {
            return "Error";
        }
        providingAuthorities.push(ProvidingAuthority(name, addr));
        emit ProviderAdded(addr, name, msg.sender);
        return "Success";
    }

    function removeProvidingAuthority (address addr)
        public
        returns (bytes32)
    {
        if (!validateAdmin(msg.sender)) {
            return "Error";
        }
        for (uint i = 0; i < providingAuthorities.length; i++) {
            if (providingAuthorities[i].addr == addr) {
                delete providingAuthorities[i];
                emit ProviderRemoved(addr, msg.sender);
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