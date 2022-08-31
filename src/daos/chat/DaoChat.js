const { Container } = require('../../containers/Container');
const chat = require('../../models/chat');

let app = null;
class DaoChat extends Container {
    constructor(){
        super(chat);
    }
    static getInstance(){
        if(!app){
            app = new DaoChat();
        }
        return app;
    }
}

module.exports = { DaoChat };