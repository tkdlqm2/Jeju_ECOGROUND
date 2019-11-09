import { axios, path } from '../config';

const PATH = path;
const makerApi = {
    
    /**
     * 이미지 임시저장
     */
    tempSave(file) {
        // {email, name, password} = param;

        const result   = {};
        const formData = new FormData();
        formData.append("image", file);
        
        axios.post(`${PATH}/common/temp/img`, formData)
             .then(res => { 
                result.urlArr = res.data
             })
        return result;
    },

    login(param) {
        // {email, password} = param;
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