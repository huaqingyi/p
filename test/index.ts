import { connect } from 'net';

const net = connect({ host: '127.0.0.1', port: 3000 });
net.on('data', data => {
    console.log(data.toString());
});
net.write(Buffer.from('aabb ...'));
