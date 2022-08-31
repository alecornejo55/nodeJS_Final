const express = require('express');
const { Router } = express; 
const router = Router();

const chatController =  require('../../controllers/chat.js');

const { checkLogout } = require('../../middlewares/auth.js');


router.get('/:id?', checkLogout, chatController.getChat);

router.post("/", checkLogout, chatController.saveMessage);


module.exports = router; 