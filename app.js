App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Colleges.json", function(colleges) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Colleges = TruffleContract(colleges);
      // Connect provider to interact with contract
      App.contracts.Colleges.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var CollegesInstance;
    //var content = $("#content");

    //content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Colleges.deployed().then(function(instance) {
      collegesInstance = instance;
      return collegesInstance.countCollegess();
    }).then(function(CollegesCount) {
      var Results = $("#CollegeList");
      Results.empty();

      for (var i = 0; i < CollegesCount; i++) {
        collegesInstance.College_accts(i).then(function(CollegeAddress) {
          collegesInstance.getCollege(CollegeAddress).then(function(name,email){
            console.log(name+" "+email);
           var CollegeTemplate= "<option>"+name+"</option>"
           Results.append(CollegeTemplate);
          })
          //console.log(College);
          //name = College[0];
          //email = College[1];
          // Render candidate Result
          //var CollegeTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
         // var CollegeTemplate= "<option>"+email+"</option>"
          //Results.append(CollegeTemplate);
         // Results.add(CollegeTemplate);
        });
      }

      //content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});