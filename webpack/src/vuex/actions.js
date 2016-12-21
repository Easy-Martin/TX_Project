import * as types from './mutation-types';
import Family from '../api/family';

export const setFamilyMember = ({commit},payload) => {
	Family.setMember(payload, res =>{
		if(res.code == 200 && res.result){
			commit(types.SET_FAMILY_MEMBER,res.result);
		}
		try {
			payload.callback(res);
		} catch (error) {
			console.info('数据更新，无回调方法');
		}
	})
}
export const changeSequence = ({commit},payload) => {
	commit(types.SET_MEMBER_SEQUENCE,payload);
}

export const register = ({commit},payload) => {
	Family.register(payload, res =>{
		payload.callback(res);
	})
}

export const change = ({commit},payload) => {
	Family.change(payload, res =>{
		payload.callback(res);
	})
}
export const money = ({commit},payload) => {
	Family.money(payload, res =>{
		payload.callback(res);
	})
}

export const setSelfMoney = ({commit},payload) => {
	Family.selfMoneyHistory(payload, res =>{
		if(res.code == 200 && res.result){
			commit(types.SET_SELF_MONEY,{data:res.result,type:payload.type});
		}else{
			commit(types.SET_SELF_MONEY,{data:{czlist:[]},type:payload.type});
		}
		try {
			payload.callback(res);
		} catch (error) {
			console.info('数据更新，无回调方法');
		}
	})
}