'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const getselfinfoAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/getselfinfo',
        type:'json'
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

export const editselfinfoAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/editselfinfo',
        type:'json',
        data:{
            name:payload.name,
            address:payload.address,
            mobile:payload.mobile,
        }
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

export const resetselfpasswdAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/resetselfpasswd',
        type:'json',
        data:{
            password:payload.password,
            repassword:payload.repassword
        }
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

