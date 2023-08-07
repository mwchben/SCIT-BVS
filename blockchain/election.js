import web3 from './web3';
import Election from './Build/Election.json';
import Cookies from "js-cookie";
const add = Cookies.get('address');

export default address => {
    const instance =  new web3.eth.Contract(
        JSON.parse(Election.interface), add
    );
    console.log("yup",add)
    instance.options.address = add;

    return instance;
};