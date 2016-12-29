'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const teamAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/team',
        type:'json'
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}

export const editteamAction = payload =>{
    request({
        method:'post',
        url:BASE_URL+'/home/admin/editteam',
        type:'json',
        data:{
            name:payload.name,
            office:payload.office,
            description:payload.description,
            num:payload.num,
            type:payload.type,
            id:payload.id
        }
    })
    .then(res =>{
        payload.callback(res);
    },err=>{
        console.log(err);
    })
}