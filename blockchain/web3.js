import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	web3 = new Web3(window.web3.currentProvider);
	console.log("Already added", web3.currentProvider);
} else {
	const provider = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/74c39a87e4e8451fa07f9056b2995395');
	web3 = new Web3(provider);

	console.log("Asking for permission", web3.eth.getAccounts());
}

export default web3;
