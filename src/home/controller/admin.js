'use strict';

import Base from './base.js';

const KEY = '__TX_ADMIN_USER__';
export default class extends Base{
    indexAction(){
        return this.display();
    }
    async loginAction(){
        let params = this.post();
        let password = think.md5(params.password + KEY);
        let result = await this.model('user_sys').where({username:params.username,password:password}).find();
        if(think.isEmpty(result)){
            return this.fail('LOGIN_ERROR',result)
        }else{
            let token = think.uuid();
            result.token = token;
            await this.session("adminUserInfo", result);
            return this.success({token:token,usrename:result.username,name:result.name});
        }
    }
    async logoutAction(){
        await this.session()
        return this.success();
    }
    async menulistAction(){
        let loginUserInfo = await this.session("adminUserInfo");
        let res = await this.model('role_menu').where({role_id:loginUserInfo.role_id}).find();
        let arr_id = res.menu_id.split(',');
        let result = await this.model('menu_sys').where({menu_id:arr_id,allowed:'1'}).select();
        return this.success(result)
    }
    async teamAction(){
        let result = await this.model('team').order('num ASC').select();
        result.forEach((item,index)=>{
            item.editLoading = false;
            item.delLoading = false;
            item.isNotice = false;
            item.type = 'error';
            item.msg = '';
        })
        return this.success(result)
    }
    async editteamAction(){
        let params = this.post();
        console.log(params);
        if(params.type == 0){
            let insertId = await this.model('team').add({
                name:params.name , 
                office: params.office,
                description:params.description,
                num:params.num,
                id:think.uuid(10)
            });
            return this.success();
        }
        if(params.type == 1){
            let affectedRows = await this.model('team').where({id:params.id}).update({
                name:params.name , 
                office: params.office,
                description:params.description,
                num:params.num
            });
            return this.success();
        }
        if(params.type == 2){
            let affectedRows = await this.model('team').where({id:params.id}).delete();
            return this.success();
        }
        return this.fail('PARAM_ERROR');
    }
    async historyAction(){
        let result = await this.model('history').order("date ASC").select();
        result.forEach((item,index)=>{
            item.editLoading = false;
            item.delLoading = false;
            item.isNotice = false;
            item.type = 'error';
            item.msg = '';
        })
        return this.success(result)
    }
    async edithistoryAction(){
        let params = this.post();
        let thisDate = new Date(params.date);
        let year = think.datetime(thisDate,'YYYY');
        let month = think.datetime(thisDate,'MM');
        let date = think.datetime(thisDate,'YYYY-MM-DD');
        if(params.type == 0){
            let insertId = await this.model('history').add({
                date:date , 
                year: year,
                month:month,
                info:params.info,
                id:think.uuid(10)
            });
            return this.success();
        }
        if(params.type == 1){
            let affectedRows = await this.model('history').where({id:params.id}).update({
                date:date , 
                year: year,
                month:month,
                info:params.info,
            });
            return this.success();
        }
        if(params.type == 2){
            let affectedRows = await this.model('history').where({id:params.id}).delete();
            return this.success();
        }
        return this.fail('PARAM_ERROR');
    }
    async userlistAction(){
        let result = await this.model('user_sys').order('create_time ASC').fieldReverse('password,role_id').select();
        if(result.length>0){
            result.forEach((item,index)=>{
                item.update_time = think.datetime(new Date(item.update_time),'YYYY-MM-DD');
                item.create_time = think.datetime(new Date(item.create_time),'YYYY-MM-DD');
            })
        }
        return this.success(result);
    }
    async edituserAction(){
        let loginUserInfo = await this.session("adminUserInfo");
        let params = this.post();

        //新增
        if(params.type=='0'){
            let isRegister = await this.model('user_sys').where({username:params.username}).find();
            if(!think.isEmpty(isRegister)){
                return this.fail('USERNAME_ERROR_REGISTERED');
            }
            let role = await this.model('role').where({type:'2'}).find();
            let password = think.md5(params.password + KEY);
            let userInfo = {
                uuid:think.uuid(),
                role_id:role.role_id,
                update_time:think.datetime(),
                create_time:think.datetime(),
                username:params.username,
                name:params.name,
                password:password,
                update_by:loginUserInfo.username,
                mobile:params.mobile,
                address:params.address
            }
            let insertId = await this.model('user_sys').add(userInfo);
            return this.success();
        }
        //更新
        if(params.type=='1'){
            let isRegister = await this.model('user_sys').where({username:params.username}).find();
            if(think.isEmpty(isRegister)){
                return this.fail('USERNAME_ERROR_NOT_FOUND');
            }
            if(isRegister.uuid === 'FIsUzXrajrMAJz6RsVVAfsq6eZMIITND'){
                return this.fail('USERNAME_ADMIN_ERROR');
            }
            let userInfo = {
                update_time:think.datetime(),
                username:params.username,
                name:params.name,
                update_by:loginUserInfo.username,
                mobile:params.mobile,
                address:params.address
            }
            let insertId = await this.model('user_sys').where({uuid:params.uuid}).update(userInfo);
            return this.success();
        }
        //删除
        if(params.type=='2'){
            let isRegister = await this.model('user_sys').where({uuid:params.uuid}).find();
            if(think.isEmpty(isRegister)){
                return this.fail('USERNAME_ERROR_NOT_FOUND');
            }
            if(isRegister.uuid === 'FIsUzXrajrMAJz6RsVVAfsq6eZMIITND'){
                return this.fail('USERNAME_ADMIN_ERROR');
            }
            let insertId = await this.model('user_sys').where({uuid:params.uuid}).delete();
            return this.success();
        }
        return this.fail('PARAM_ERROR');
    }
    async resetpasswdAction(){
        let params = this.post();
        let password = think.md5('123456' + KEY);
        let insertId = await this.model('user_sys').where({uuid:params.uuid}).update({password:password});
        return this.success();
    }
    async getselfinfoAction(){
        let loginUserInfo = await this.session("adminUserInfo");
        return this.success({
            username:loginUserInfo.username,
            name:loginUserInfo.name,
            address:loginUserInfo.address,
            mobile:loginUserInfo.mobile,
        })
    }
    async editselfinfoAction(){
        let params = this.post();
        let a = (params.name.length > 0) ? true : false;
        if(think.isEmpty(params) || !a ){
            return this.fail('PARAM_ERROR');
        }
        let loginUserInfo = await this.session("adminUserInfo");
        let insertId = await this.model('user_sys').where({uuid:loginUserInfo.uuid}).update({
            name:params.name,
            address:params.address,
            mobile:params.mobile,
        })
        return this.success()
    }
    async resetselfpasswdAction(){
        let params = this.post();
        if(!params.password || !params.repassword){
            return this.fail('PARAM_ERROR');
        }
        let loginUserInfo = await this.session("adminUserInfo");
        let oldpassword = think.md5(params.password + KEY);
        let isSelf = await this.model('user_sys').where({uuid:loginUserInfo.uuid,password:oldpassword}).find();
        if(think.isEmpty(isSelf)){
            return this.fail('LOGIN_ERROR');
        }
        let newpassword = think.md5(params.repassword + KEY);
        let insertId = await this.model('user_sys').where({uuid:loginUserInfo.uuid}).update({password:newpassword});
        return this.success();
    }
}