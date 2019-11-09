import { axios, path } from '../config'


const dealService = {
    registerGood: (txHash) => {
        const param = txHash;
        const jwt = sessionStorage.getItem('jwt');
        if(!jwt) return false;

        return axios.post(`${path}/deal/register`, param, {
                    header: {'x-access-token' : jwt}
                }).then(res => {
                    return res.status === 200;
                })
    }
};
export default dealService;