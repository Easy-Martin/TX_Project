'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const userlistAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/userlist',
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

export const edituserAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/edituser',
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            },
            type: 'json',
            data: {
                name: payload.name,
                username: payload.username,
                address: payload.address,
                mobile: payload.mobile,
                password: payload.password,
                type: payload.type,
                uuid: payload.uuid
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

export const resetpasswdAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/resetpasswd',
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            },
            type: 'json',
            data: {
                uuid: payload.uuid
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