import { axios, path } from '../config'


const dealService = {
    registerDeal: (txHash) => {
        const param = txHash;
        const jwt = sessionStorage.getItem('jwt');
        if (!jwt) return false;

        return axios.post(`${path}/deal/register`, param, {
<<<<<<< HEAD
            headers: { 'x-access-token': jwt }
        }).then(res => {
            return res.status === 200;
        })
=======
                    headers: {'x-access-token' : jwt}
                }).then(res => {
                    return res.status === 200;
                })
>>>>>>> a97ddcbffd914546b2c59c8ab35405c20ce92000
    },

    getDealList: () => {
        const jwt = sessionStorage.getItem('jwt');
        if (!jwt) return false;

<<<<<<< HEAD
        return axios.post(`${path}/deal/register`, {/*no param*/ }, {
            headers: { 'x-access-token': jwt }
=======
        return axios.post(`${path}/deal/register`, {/*no param*/}, {
            headers: {'x-access-token' : jwt}
>>>>>>> a97ddcbffd914546b2c59c8ab35405c20ce92000
        }).then(res => {
            return res.data;
        })
    }
};
export default dealService;