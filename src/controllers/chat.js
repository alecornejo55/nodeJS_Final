const ChatService = require('../services/chat.service');
const chat = new ChatService();

const getChat = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let chats = [];
        if(id == null) {
            chats = await chat.getAll();
        }
        else {
            chats = await chat.getById(id);
            if(chats === null) {
                throw new Error('El mensaje no existe');
            }
        }
        res.send({
            success: true,
            data: chats
        });        
    } catch (error) {
        res.send({
            success: false,
            message: error.message || error
        });
    }
}

const saveMessage = async (req, res) => {
    // console.log(req.body);
    const message = {
        message: req.body.message,
        author: req.body.author
    }
    try {
        const newMessage = await chat.save(message);
        res.status(200).json({
            success: true,
            data: newMessage
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { getChat, saveMessage }