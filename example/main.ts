import { PFactory } from '../src';

async function bootstrap() {
    const app = await PFactory.create({});
    app.listen();
}

bootstrap();
