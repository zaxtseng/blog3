//数据请求接口封装
import axios from 'axios'
import { Message } from 'element-ui'

axios.default.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.default.baseURL = 'http://blog-server.hunger-valley.com'
axios.default.withCredentials = true

export default function request(url, type = 'GET', data = {}){
    return new Promise((resolve,reject)=>{
        let option = {
            url,
            method: type
        }
        if(type.toLowerCase() === 'get'){
            option.params = data
        }else{
            option.data = data
        }
        axios(option).then(res => {
            if(res.data.status === 'ok'){
                resolve(res.data)
            }else{
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch(err => {
            Message.error('网络异常')
            reject({msg: '网络异常' })
        })
    })
}