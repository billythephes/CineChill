import axiosClient from './axiosClient';

class HandleAPI {
    getData = async (url: string) => {
        return axiosClient.get(url);
    }
}

const handleAPIs = new HandleAPI();

export default handleAPIs;