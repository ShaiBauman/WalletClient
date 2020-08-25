import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

const instance = axios.create({
    baseURL: 'http://487ba6816aa4.ngrok.io'
});

instance.interceptors.request.use(
    async (config)=>{
        const id = await AsyncStorage.getItem('id');
        if(id){
            config.headers.Authorization = `Bearer ${id}`;
        }
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
);

export default instance;
