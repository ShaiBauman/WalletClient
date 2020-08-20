import axios from 'axios';
import {AsyncStorage} from "react-native";

const instance = axios.create({
    baseURL: 'http://76a3b578abe0.ngrok.io/'
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
