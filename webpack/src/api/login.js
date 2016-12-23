'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8360';

export const loginAction = (payload)=>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/login',
        data:{username:payload.username,password:payload.password},
        type:'json'
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}