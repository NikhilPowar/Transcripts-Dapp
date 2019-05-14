# Transcripts DApp
This project is an implementation of a blockchain based transcript system.

## Motivation
There is a need for a reliable system of efficient and simplified process for academic transcript application and procurement along with sufficient measures for authentication of issued transcripts and verification of the integrity of transcripts. Blockchain is an excellent technology to achieve all the requisite properties. This project is an attempt to create a blockchain based web-application which can be used by students for application of transcripts, which can only be approved and issued by the intended institute, and by universities for the verification of the transcripts issued. The system attempts to leverage the immutability and transparency of blockchain and versatility of programming provided by smart contracts to ensure that there is no avenue for alteration or forgery of transcripts.

## Requirements
This project requires Node.js 9 or above. To test the system you will require an Ethereum wallet. Either browser extensions like Metamask or function-call supporting mobile wallets like WallEth will work. This project runs on the Ropsten testnet and hence no real currency is required to test its working

## How to execute
### Package installation
First install npm packages using `npm install` 

### Run Development mode
Run in development mode using `npm run start` or `ng serve`

### Production build
To deply the application, first build using `ng build --prod` and then deploy to platform of your choice.
