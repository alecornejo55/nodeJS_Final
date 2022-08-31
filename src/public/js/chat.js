const socket = io();
const formChat = document.querySelector('#formMessages');

Handlebars.registerHelper("formatDate", function (datetime, format) {
    return new Date(datetime).toLocaleString("es-AR");
});

const renderChat = async (data) => {
    const template = await fetch('/templates/chat.hbs');
    const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ chat: data });
	document.querySelector('#messages').innerHTML = html;
}

formChat.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formChat);
    const newProducto = {
        author: {
            id: formData.get('email'),
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            edad: formData.get('edad'),
            alias: formData.get('alias'),
            avatar: formData.get('avatar'),
        },
        text:  formData.get('message'),
        // dateTime: new Date().toLocaleString("es-AR"),
    };
    console.log(newProducto);
    try {
        socket.emit('new-message', newProducto);
        document.querySelector("#message").value = '';
    }
    catch (error) {
        Swal.fire(
            'Ha ocurrido un error',
            `El producto no ha sido envíado: ${error.message}`,
            'error'
        );
        console.warn(error);
    }
});

socket.on('messages', (data) => {
    console.log(data);
    renderChat(data);
});