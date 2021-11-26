import { Server, connect } from 'net';
import { join } from 'path';

const tcp = new Server(socket => {
    socket.on('data', data => {
        // console.log(data.toString());
        const tcp = connect(join(__dirname, '../test.sock'));
        tcp.on('data', data => {
            socket.write(data);
            socket.end();
        });
        tcp.write(data);
    });
});

tcp.listen(3000);
