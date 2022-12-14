const ProductService = require('../services/product.service');
const CartService = require('../services/cart.service');
const ChatService = require('../services/chat.service');
const product = new ProductService();
const cart = new CartService();
const chat = new ChatService();

const hbsHelpers = require('../utils/hbs.util');

const login = (req, res) => {
    res.render('login', { title: 'Iniciar sesión' });
}
const signup = (req, res) => {
    res.render('signup', { title: 'Registro' });
}
const getUser = (user) => {
    const data = {
        name: user.name,
        username: user.username,
        address: user.address,
        age: user.age,
        phone: user.phone,
        avatar: user.avatar,
        admin: user.admin,
        cart: user.cart,
        id: user.id
    }
    return data;
}
const products = async (req, res) => {
    const user = {
        name: req.user.name,
        username: req.user.username,
        address: req.user.address,
        age: req.user.age,
        phone: req.user.phone,
        avatar: req.user.avatar,
        admin: req.user.admin,
        cart: req.user.cart
    }
    const products = await product.getAll();
    res.render('dashboard', { title: 'Dashboard', user, products });
}
const index = (req, res) => {
    // res.render('index', { title: 'Index' });
    res.redirect('/login');
}
const logout = (req, res) => {
    req.session.destroy(() => {
        req.session = null
    });
    res.redirect('/login');
}
const productsAdmin = async (req, res) => {
    const user = getUser(req.user);
    const products = await product.getAll();
    res.render('products', { title: 'Productos', user, products });
}
const productDetail = async (req, res) => {
    const id = req.params.id;
    const productFound = await product.getById(id);
    const user = getUser(req.user);
    res.render('productDetail', { title: 'Detalle del producto', user, product: productFound });
}
const cartInfo = async (req, res) => {
    const logger = req.app.get('logger');
    const user = getUser(req.user);
    const myCart = await cart.getById(user.cart);
    // logger.info(myCart.products);
    // logger.info(myCart);
    res.render('cart', {
        title: 'Carrito de compras', 
        user, 
        cart: myCart,
        helpers: hbsHelpers
    });
}
const orderSuccess = async (req, res) => {
    const logger = req.app.get('logger');
    const user = getUser(req.user);
    const myCart = await cart.getById(user.cart);
    // logger.info(myCart.products);
    // logger.info(myCart);
    res.render('orderSuccess', {
        title: '¡Compra éxitosa!', 
        user, 
        cart: myCart,
        helpers: hbsHelpers
    });
}
const userProfile = async (req, res) => {
    const logger = req.app.get('logger');
    const user = getUser(req.user);
    res.render('userProfile', {
        title: 'Mi perfil', 
        user, 
    });
} 
const chatBroadcast = async (req, res) => {
    const logger = req.app.get('logger');
    const user = getUser(req.user);
    const io = req.app.get('socketio');
    res.render('chatBroadcast', {
        title: 'Chat general',
        user
    });
}

module.exports = {
    login, signup, index, products, logout, productsAdmin, productDetail, cartInfo, orderSuccess, userProfile, chatBroadcast
}