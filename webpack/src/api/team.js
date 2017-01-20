'use strict';
import request from 'reqwest';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8361';

export const teamAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/team',
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

export const editteamAction = (vm, payload) => {
    request({
            method: 'post',
            url: BASE_URL + '/home/admin/editteam',
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            },
            type: 'json',
            data: {
                name: payload.name,
                office: payload.office,
                description: payload.description,
                num: payload.num,
                type: payload.type,
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