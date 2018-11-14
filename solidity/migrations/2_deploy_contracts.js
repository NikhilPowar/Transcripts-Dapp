var TranscriptApplication=artifacts.require ('./TranscriptApplication.sol');

module.exports = function(deployer, network, accounts) {
    const providerAddress = accounts[1]
    const verifierAddress = accounts[2];
    deployer.deploy(TranscriptApplication, providerAddress, verifierAddress);
}