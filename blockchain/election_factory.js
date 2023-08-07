import web3 from './web3';
import ElectionFactory from './Build/ElectionFact.json';


const instance = new web3.eth.Contract(
	JSON.parse(ElectionFactory.interface),
    process.env.CONTRACT_ADDRESS
    // '0x73F951a06Eb211B9d877F316c79dFc7e7ad3ae42'
);

instance.options.address = process.env.CONTRACT_ADDRESS;



export default instance;