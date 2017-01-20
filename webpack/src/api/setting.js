'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const getselfinfoAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/getselfinfo',
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

export const editselfinfoAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/editselfinfo',
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            },
            type: 'json',
            data: {
                name: payload.name,
                address: payload.address,
                mobile: payload.mobile,
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

export const resetselfpasswdAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/resetselfpasswd',
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            },
            type: 'json',
            data: {
                password: payload.password,
                repassword: payload.repassword
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