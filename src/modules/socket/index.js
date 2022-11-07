import socketIO from 'socket.io';
// const serverIO    =   require('socket.io');
// const subsciption =   require('./subscription');

export default async (server, app) => {
    const io = socketIO(server);
    app.set('io', io);
    await io.on('connection', socket => {
        app.set('socket', socket);
        socket.on('subscribe', async (user) => {
            console.log('subscribe!!', { user });
            //   if(!user) return false;
            //   socket.user = user;
            //   await subsciption.on(socket);
        });

        socket.on('disconnect', async () => {
            if (!socket.user) return false;
            // await subsciption.off(socket);
        });
    });
    return io;
}