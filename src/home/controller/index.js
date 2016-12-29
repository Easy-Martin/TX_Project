'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  async historyAction(){
    //auto render template file index_history.html
    let result = await this.model('history').order("date ASC").select();
    this.assign('list',result);
    return this.display();
  }
  cultureAction(){
    //auto render template file index_culture.html
    return this.display();
  }
  infoAction(){
    //auto render template file index_info.html
    return this.display();
  }
  async teamAction(){
    //auto render template file index_team.html
    let result = await this.model('team').order("num ASC").select();
    this.assign('list',result);
    return this.display();
  }
}