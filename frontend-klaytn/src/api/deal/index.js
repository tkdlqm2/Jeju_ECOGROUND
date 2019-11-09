import { axios, path } from '../config'


const dealService = {
    registerDeal: (txHash) => {
        const param = txHash;
        const jwt = sessionStorage.getItem('jwt');
        if(!jwt) return false;

        return axios.post(`${path}/deal/register`, param, {
                    header: {'x-access-token' : jwt}
                }).then(res => {
                    return res.status === 200;
                })
    },

    getDealList: () => {
        const jwt = sessionStorage.getItem('jwt');
        if(!jwt) return false;

        return axios.post(`${path}/deal/register`, {/*no param*/}, {
            header: {'x-access-token' : jwt}
        }).then(res => {
            return res.data;
        })
    }
};
export default dealService;