import { PFactory, TCPTransform, Transport } from '../src';

async function bootstrap() {
    // const app = await PFactory.create({});
    // app.listen();

    const tapp = await PFactory.create({
        transport: Transport.TCP,
    });
    tapp.use(TCPTransform);
    tapp.use(async (ctx, next) => {
        await next();
        // ctx
    });
    tapp.listen(3001);
}

bootstrap();
