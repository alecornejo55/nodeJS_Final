const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: { type: String, required: true, trim: true, message: 'El mensaje está vacío' },
    author: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
        username: {type: String, required: true},
        name: {type: String, required: true},
        phone: { type: String, required: true, trim: true },
        admin: { type: Boolean, required: true, default: false },
        avatar: {type: String, required: true},
    },
    dateTime: {type: Date, required: true, default: Date.now},
});
chatSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const chat = mongoose.model('chat', chatSchema);

module.exports = chat;