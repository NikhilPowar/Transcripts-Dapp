var TranscriptApplication=artifacts.require ('./TranscriptApplication.sol');
var KeyHolder = artifacts.require ('./KeyHolder.sol');
var KeyHolderLibrary = artifacts.require ('./KeyHolderLibrary');

module.exports = function(deployer, network, accounts) {
    const providerAddress = accounts[1]
    const verifierAddress = accounts[2];
    deployer.deploy(TranscriptApplication, providerAddress, verifierAddress);
    deployer.deploy(KeyHolderLibrary);
    deployer.link(KeyHolderLibrary, KeyHolder);
    deployer.deploy(KeyHolder);
}