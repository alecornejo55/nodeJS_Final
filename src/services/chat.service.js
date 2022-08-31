const PersistenceFactory = require('../daos/persistenceFactory');

class ChatService {
    constructor() {
        this.chatDao;
        this.init();
    }
    init = async () => {
        const { DaoChat } = await PersistenceFactory.getPersistence();
        this.chatDao = DaoChat;
    }
    save = async (chat) => {
        const data = await this.chatDao.save(chat);
        if(data.success === false ){
            throw Error(data.message);
        }
        return data;
    }
    getAll = async () => {
        return await this.chatDao.getAll();
    }
    getById = async (id) => {
        return await this.chatDao.getById(id);
    }
    updateById = async (id, chat) => {
        return await this.chatDao.updateById(id, chat);
    }
    deleteById = async (id) => {
        return await this.chatDao.deleteById(id);
    }
}

module.exports = ChatService;