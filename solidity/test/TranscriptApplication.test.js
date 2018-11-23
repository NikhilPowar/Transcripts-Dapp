var TranscriptApplication = artifacts.require("TranscriptApplication");

contract('TranscriptApplication', function(accounts) {
    var student_account = accounts[0];
    var provider_account = accounts[1];
    var verifier_account = accounts[2];
    var random_account = accounts[9];

    it("initial hash should be unset", () => {
        return TranscriptApplication.deployed().then((instance) => {
            return instance.getTranscriptHash.call();
        }).then((hash) => {
            assert.equal(hash.valueOf(), "Not set", "Transcript Hash is not equal to \"Not Set\"");
        });
    });

    it("check owner account's address", () => {
        return TranscriptApplication.deployed().then((instance) => {
            return instance.getTranscriptOwner.call();
        }).then((address) => {
            assert.equal(address.valueOf(), accounts[0], "Owner address doesn't match first account");
        });
    });

    it("ensure no other party can set transcriptHash", () => {
        return TranscriptApplication.deployed().then((instance) => {
            instance.setTranscriptHash.sendTransaction("QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", {"from": random_account})
            return instance.getTranscriptHash.call();
        }).then((hash) => {
            assert.equal(hash.valueOf(), "Not set", "Transcripts were set by an unauthorized account");
        });
    });

    it("ensure authorized party can set transcriptHash", () => {
        return TranscriptApplication.deployed().then((instance) => {
            instance.setTranscriptHash.sendTransaction("QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", {"from": provider_account})
            return instance.getTranscriptHash.call();
        }).then((hash) => {
            assert.equal(hash.valueOf(), "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "Transcript hash could not be set by the authorized account");
        });
    });

    it("ensure no other party can verify hash", () => {
        return TranscriptApplication.deployed().then((instance) => {
            instance.verify.sendTransaction({"from": random_account})
            return instance.isVerified.call();
        }).then((check) => {
            assert.equal(check.valueOf(), false, "Transcripts were verified by an unauthorized account");
        });
    });

    it("ensure verifier can verify hash", () => {
        return TranscriptApplication.deployed().then((instance) => {
            instance.verify.sendTransaction({"from": verifier_account})
            return instance.isVerified.call();
        }).then((check) => {
            assert.equal(check.valueOf(), true, "Transcripts could not verified by the authorized account");
        });
    });

    it("check that hash remains unchanged after verification", () => {
        return TranscriptApplication.deployed().then((instance) => {
            return instance.getTranscriptHash.call();
        }).then((hash) => {
            assert.equal(hash.valueOf(), "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "Verification changed the hash value");
        });
    });
});
