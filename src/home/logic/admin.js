'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  async __before(){
      if(this.http.url !== '/home/admin'){
          if(!this.isPost()){
              return think.statusAction(403, this.http);
          }
          let url_b = ((this.http.url === '/home/admin/login') || (this.http.url === '/home/admin/logout')) ? true : false;
          let Login_session = await this.session("adminUserInfo");
          if(!url_b){
              if(think.isEmpty(Login_session)){
                 return this.fail('LOGIN_EXPIRED');
              }
          }
          if(this.http.url.indexOf('user')>-1){
              let role = await this.model('role').where({role_id:Login_session.role_id}).find();
              console.log('权限识别中...')
              if(role.type !=='1'){
                  console.log('没有此权限')
                  return this.fail('PERMISSION_ERROR');
              }
          }
      }else{
          if(!this.isGet()){
              return think.statusAction(403, this.http);
          }
      }
      

  }
  indexAction(){
   
  }
}