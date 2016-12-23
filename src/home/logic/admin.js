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
  __before(){
      if(this.http.url!=='/home/admin'){
          if(!this.isPost()){
              return think.statusAction(403, this.http);
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