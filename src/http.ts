import { existsSync, unlinkSync } from 'fs';
import { Server } from 'http';
import { join } from 'path';

const server = new Server((req, resp) => {
    resp.end(`hello world ${req.url} ...`);
});

if (existsSync(join(__dirname, '../test.sock'))) unlinkSync(join(__dirname, '../test.sock'));

server.listen(join(__dirname, '../test.sock'));
