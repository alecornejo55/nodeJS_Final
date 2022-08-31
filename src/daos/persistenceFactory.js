const config = require('../config/globals');

let DaoProduct, DaoCart, DaoUser, DaoChat;
class PersistenceFactory {
    static getPersistence = async () => {
        switch (config.app.persistence) {
            case 'mongo':
                const { DaoProduct: product } = require('./product/DaoProduct');
                const { DaoCart: cart } = require('./cart/DaoCart');
                const { DaoUser: user } = require('./user/DaoUser');
                const { DaoChat: chat } = require('./chat/DaoChat');

                DaoProduct = product.getInstance();
                DaoCart = cart.getInstance();
                DaoUser = user.getInstance();
                DaoChat = chat.getInstance();

                return { DaoProduct, DaoCart, DaoUser, DaoChat };
        }
    }
}
module.exports = PersistenceFactory;