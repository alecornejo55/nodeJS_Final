const cartRouterApi = require('./api/cart');
const productRouterApi = require('./api/product');
const userRouter = require('./api/user');
const chatRouter = require('./api/chat');
const publicRouter = require('./public/main');

module.exports = { cartRouterApi, productRouterApi, publicRouter, userRouter, chatRouter };