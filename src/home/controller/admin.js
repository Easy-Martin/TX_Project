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
            return this.success({token:token});
        }
    }
    async adduserAction(){
        let params = this.post();
        let password = think.md5(params.password + KEY);
        let userInfo = {
            uuid:think.uuid(16),
            role_id:'1',
            update_time:think.datetime(),
            create_time:think.datetime(),
            username:'admin',
            name:'管理员',
            password:password,
            update_by:'admin'
        }
        let insertId = await this.model('user_sys').add(userInfo);
        console.log(insertId)
        return this.json(insertId)
    }
}