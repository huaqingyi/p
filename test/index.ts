import { existsSync, removeSync } from 'fs-extra';
import { Server, connect } from 'net';
import { Server as S } from 'http';

const app = new Server(socket => {
    if (existsSync('./a.sock')) removeSync('./a.sock');
    const app = new S((req, resp) => {
        resp.end('aaa');
    });
    app.listen('./a.sock');
    socket.on('data', data => {
        console.log(data.toString());
        const c = connect('./a.sock');
        c.write(data);
        c.on('data', data => socket.write(data));
    });
});

app.listen(3000);
