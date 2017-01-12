'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }
    async channelAction() {
        //auto render template file channel_history.html
        return this.display();
    }
    serverAction() {
        //auto render template file server_culture.html
        return this.display();
    }
    async infoAction() {
        //auto render template file index_info.html
        let result = await this.model('history').order("date ASC").select();
        this.assign('list', result);
        return this.display();
    }
    async teamAction() {
        //auto render template file index_team.html
        let result = await this.model('team').order("num ASC").select();
        result.forEach((item, index) => {
            result[index].img = '/static/public/img/team/' + (index + 1) + '.png';
        })
        this.assign('list', result);
        return this.display();
    }
}