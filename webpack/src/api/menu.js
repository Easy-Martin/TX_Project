'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const menulistAction = (payload)=>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/menulist',
        type:'json'
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}