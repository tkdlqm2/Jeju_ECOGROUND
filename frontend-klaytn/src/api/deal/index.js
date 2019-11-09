import { axios, path } from '../config'


const importer = {
    registerGood: (txHash) => {
        return axios.post(`${path}/deal/register`, { txHash })
            .then(res => {
                return res.status == 200 ? true : false;
            })
    }
}

export default importer;