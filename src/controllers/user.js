const multer = require('multer');
const UserService = require('../services/user.service');
const user = new UserService();

const CartService = require('../services/cart.service');
const cart = new CartService();

const { createLogger } = require('../config/logger.config');
const logger = createLogger('PROD');

const { createHash } = require('../utils/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads');
    }
    , filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const validation = (req, file, cb) => {
    // console.log(file.mimetype);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    }
    else {
        cb(new Error('Only .png and .jpg allowed'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: validation });
const uploadAvatar = upload.single('avatar');
const login = async (req, res) => {
    const userCart = await cart.getUserCart(req.user.id);
    if(userCart.success === false) {
        const cartCreated = await cart.save({user: req.user.id});
    }
    res.status(200).json({
        status: 'success',
        message: "ok",
    });
}

const failedLogin = (req, res) => {
    res.status(401).json({
        status: 'error',
        message: req.flash('loginMessage')
    });
}

const createUser = async (req, res) => {
    const cartCreated = await cart.save({user: req.user.id});
    res.status(200).json({
        status: 'success',
        message: "ok",
    });
}

const failedSignup = (req, res) => {
    res.status(401).json({
        status: 'error',
        message: req.flash('signupMessage')
    });
}
const updateUser = async(req, res) => {
    const { username, name, password, password2, address, age, phone } = req.body;
    // console.log(username, name, password, password2, address, age, phone);
    try {
        if(password !== password2){
            throw new Error(req.flash('updateMessage', "Las contraseñas no coinciden"));
        }
        const data = {
            username,
            name,
            address,
            age,
            phone,
        }
        if(password != ''){
            data.password = createHash(password);
        }
        if(req.file){
            data.avatar = req.file.filename
        }
        
        const update = await user.updateById(req.user._id, data);
        // console.log(update);
        res.status(200).json({
            status: 'success',
            message: "ok",
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: req.flash('updateMessage')
        });
    }
};

module.exports = {
    createUser, uploadAvatar, failedSignup, login, failedLogin, updateUser
}