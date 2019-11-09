import { axios, path } from '../config';

const PATH = path;
const makerApi = {
    
    /**
     * 이미지 임시저장
     * @author Dong-Min Seol
     * @since  2019.11.09
     * @param  {email, name, password}
     */
    tempSave: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return axios.post(`${PATH}/common/temp/img`, formData)
                    .then(res => {
                        console.log(res.data)
                        return res.data
                    });

    },

    /**
     * 이미지 임시저장
     * @author Dong-Min Seol
     * @since  2019.11.09
     * @param  {email, name, password}
     */
    register: (param) => {
        const jwt = sessionStorage.getItem('jwt');

        if(!jwt) return false;

        return axios.post(`${PATH}/maker/register`, param, {
                        header : { 'x-access-token' : jwt }
                  }).then(res => {
                    return res.data
                  });

    },
};
export default makerApi;