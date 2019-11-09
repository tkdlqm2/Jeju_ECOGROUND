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
                return res.data
            });

    },

    /**
     * 상품등록
     * @author Dong-Min Seol
     * @since  2019.11.09
     */
    register: (param) => {
        const jwt = sessionStorage.getItem('jwt');
        return axios.post(`${PATH}/maker/register`, param, {
<<<<<<< HEAD
            headers: { 'x-access-token': jwt }
        }).then(res => { return res });
=======
                    headers : { 'x-access-token' : jwt }
                  }).then(res => { return res });
>>>>>>> a97ddcbffd914546b2c59c8ab35405c20ce92000

    },
};
export default makerApi;