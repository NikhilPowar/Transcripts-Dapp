var TranscriptApplication = artifacts.require("KeyHolder");

contract('KeyHolder', function(accounts) {

    var manager = accounts[0];
    var action1 = accounts[1];
    var action2 = accounts[2];
    var claimSigner1 = accounts[3];
    var claimSigner2 = accounts[4];
    var encryption1 = accounts[5];
    var encryption2 = accounts[6];
    
    it("initial keyholder must contain one key", () => {
        return TranscriptApplication.deployed().then((instance) => {
            return instance.getKey().call();
        }).then((hash) => {
            assert.equal(hash.valueOf(), "Not set", "Transcript Hash is not equal to \"Not Set\"");
        });
    });

});