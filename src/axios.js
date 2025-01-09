import axios from 'axios'
import router from './router'
import {arrayFindIndex} from "element-ui/src/utils/util";
import Element from 'element-ui'

axios.defaults.baseURL="http://localhost:8880"


//前置拦截
axios.interceptors.request.use(config =>{
    return config
})

axios.interceptors.response.use(response =>{
    let res = response.data;
    if (res.status === 10000){
        return response
    }else {
        Element.Message.error(res.msg,{duration: 1 *1000})
        return Promise.reject(response.data.msg)
    }
})