'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const historyAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/history',
        type:'json'
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

export const edithistoryAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/edithistory',
        type:'json',
        data:{
            date:payload.date,
            type:payload.type,
            info:payload.info,
            id:payload.id
        }
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}