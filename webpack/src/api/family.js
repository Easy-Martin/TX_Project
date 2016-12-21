'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://www.nbybt.cn:8080';

export default {
    setMember(payload,callback){
        request({
            method:'post',
            url:BASE_URL+'/ybquery/gjw/getGJW1001',
            data:{AES:payload.AES},
            type:'json'
        })
        .then(res =>{
            callback(res);
        },err=>{
            console.log(err);
        })
    },
    register(payload,callback){

        request({
            method:'post',
            url:BASE_URL+'/ybquery/gjw/getGJW1002',
            data:{
                AES:payload.AES,
                GJWBH:payload.GJWBH,
                CZLX:payload.CZLX,
            },
            type:'json'
        })
        .then(res =>{
            callback(res);
        },err=>{
            console.log(err);
        })

    },
    change(payload,callback){
        request({
            method:'post',
            url:BASE_URL+'/ybquery/gjw/getGJW1003',
            data:{
                AES:payload.AES,
                GJWBH:payload.GJWBH,
                CYSBK:payload.CYSBK,
                CYSHBZH:payload.CYSHBZH,
                CYXM:payload.CYXM,
                CZLX:payload.CZLX,
                SYSX:payload.SYSX,
                YFQRGX:payload.YFQRGX,
            },
            type:'json'
        })
        .then(res =>{
            callback(res);
        },err=>{
            console.log(err);
        })

    },
    money(payload,callback){

        request({
            method:'post',
            url:BASE_URL+'/ybquery/gjw/getGJW1004',
            data:{
                AES:payload.AES,
                GJWBH:payload.GJWBH,
                CZLX:payload.CZLX,
                JE:payload.JE
            },
            type:'json'
        })
        .then(res =>{
            callback(res);
        },err=>{
            console.log(err);
        })
    },
    selfMoneyHistory(payload,callback){
        request({
            method:'post',
            url:BASE_URL+'/ybquery/gjw/getGJW1005',
            data:{
                AES:payload.AES,
                GJWBH:payload.GJWBH,
                MYJT:payload.MYJT,
                DJY:payload.DJY
            },
            type:'json'
        })
        .then(res =>{
            callback(res);
        },err=>{
            console.log(err);
        })
    }
}