
const IPFS = require('ipfs-api');

const projectId = '2N4QwWvzTWOeSxgeUBpI0DSC3v7';
const projectSecret = '5967f2f5cafe7875e63b459c9d091b16';

const auth ="Basic " + Buffer.from(projectId + ':' + projectSecret).toString(`base64`);
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: auth
    } });
export default ipfs;