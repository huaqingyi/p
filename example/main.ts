import { PFactory } from '../src';

async function bootstrap() {
    const app = PFactory.create({});
    app.listen();
}

bootstrap();
