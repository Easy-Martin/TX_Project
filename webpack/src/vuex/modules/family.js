import { SET_FAMILY_MEMBER ,SET_MEMBER_SEQUENCE ,SET_SELF_MONEY} from '../mutation-types';
import  MDate from '../../assets/MDate';
const state = {
  data:{
    register:{
      xm:'',
      sbkh:'',
      gjye:'',
    },
    isRegister:'false',
    loginMedicare:'',
    member:[],
    money:[],
  }
};

const mutations = {
  [SET_FAMILY_MEMBER](state,data){
    state.data.register = data.register;
    if(Array.isArray(data.member)){
      state.data.member = data.member;
    }
    state.data.isRegister = data.isRegister;
    state.data.loginMedicare = data.loginMedicare;
  },
  [SET_MEMBER_SEQUENCE](state,payload){
    let target_member = state.data.member[payload.targetIndex];
    let change_member = state.data.member[payload.index];
    console.log(change_member.xm+'---序号变为'+ (payload.targetIndex + 2));
    if(payload.type){
      let arr = state.data.member;
      arr.splice(payload.index,1)
      arr.splice(payload.targetIndex,0,change_member)
      state.data.member = arr;
    }else{
      state.data.member[payload.index] = target_member;
      state.data.member[payload.targetIndex] = change_member;
    }
    
  },
  [SET_SELF_MONEY](state,payload){
    if(Array.isArray(payload.data.czlist)){
      payload.data.czlist.forEach((item,index)=>{
        let thisDate = new MDate(item.czsj);
        item.czsj = thisDate.Format('YYYY-MM-DD');
        thisDate = null;
      })
      if(payload.type){
        state.data.money = payload.data.czlist;
      }else{
        payload.data.czlist.forEach((item ,index) => {
          state.data.money.push(item);
        })
      }
    }
  }
};
export default {
  state,
  mutations,
}
