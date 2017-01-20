'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const historyAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/history',
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            },
            type: 'json'
        })
        .then(res => {
            if (res.code == '301') {
                sessionStorage.clear('TOKEN');
                vm.$router.replace('/login');
            } else {
                payload.callback(res);
            }
        }, err => {
            console.log(err);
        })
}

export const edithistoryAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/edithistory',
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            },
            type: 'json',
            data: {
                date: payload.date,
                type: payload.type,
                info: payload.info,
                id: payload.id
            }
        })
        .then(res => {
            if (res.code == '301') {
                sessionStorage.clear('TOKEN');
                vm.$router.replace('/login');
            } else {
                payload.callback(res);
            }
        }, err => {
            console.log(err);
        })
}