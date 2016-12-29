'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const userlistAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/userlist',
        type:'json'
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

export const edituserAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/edituser',
        type:'json',
        data:{
            name:payload.name,
            username:payload.username,
            address:payload.address,
            mobile:payload.mobile,
            password:payload.password,
            type:payload.type,
            uuid:payload.uuid
        }
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

export const resetpasswdAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/resetpasswd',
        type:'json',
        data:{
            uuid:payload.uuid
        }
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

