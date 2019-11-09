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
    login(param) {
        let result = {};
        axios.post(`${PATH}/user/login`, param)
            .then( res => {
                result.repl = res;
                if(res.status == 200)
                    sessionStorage.setItem('jwt', res.data.token)
            })
        return result;
    },
};
export default makerApi;