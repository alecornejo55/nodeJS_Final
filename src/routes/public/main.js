const express = require('express');
const public = require('../../controllers/public');
const { checkAuth, checkLogout, checkAdmin } = require('../../middlewares/auth');
const { Router } = express; 
const router = Router();

router.get('/', checkAuth, public.index);

router.get('/login', checkAuth, public.login);

router.get('/signup', checkAuth, public.signup);

router.get('/productos', checkLogout, public.products);

router.get('/logout', checkLogout, public.logout);

router.get('/productos-admin', checkLogout, checkAdmin, public.productsAdmin);

router.get('/productos/detalle/:id', checkLogout, public.productDetail);

router.get('/orden-enviada', checkLogout, public.orderSuccess);

router.get('/carrito', checkLogout, public.cartInfo);

router.get('/perfil', checkLogout, public.userProfile);

router.get('/chat', checkLogout, public.chatBroadcast);

module.exports = router;