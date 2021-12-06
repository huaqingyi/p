import Koa from 'koa';
import { env } from '../composition';
import { PCore } from '../core/pcore';
import { PYIClass } from '../core/types';
import { Loaded } from '../core/loaded';
import Router from 'koa-router';
import { join } from 'path';
import { Server, connect } from 'net';
import { existsSync, removeSync } from 'fs-extra';

export class Application extends Koa {
    public static pyi: Application;

    public static _core() {
        return Application;
    }

    public static _root() {
        return Application;
    }

    public static _extends() {
        return Application.prototype;
    }

    public get _root() {
        return Application._root;
    }

    public get _extends() {
        return Application._extends;
    }

    public get pyi() {
        return Application.pyi;
    }

    public set pyi(pyi) {
        Application.pyi = pyi;
    }

    public get app() {
        return Application.pyi;
    }

    public set app(pyi) {
        Application.pyi = pyi;
    }

    public router: Router;

    constructor(...props: any[]) {
        super(...props);
        if (!Application.pyi) Application.pyi = this;
        this.router = new Router();
        return Application.pyi;
    }
}

export const pyi = new Application();

export async function bootstrap<P extends PYIApplcation>(target: PYIClass<P> & ThisType<P>) {
    const config = env();
    const apath = config.APP_PATH;
    const loaded = new Loaded(apath);
    await loaded.mounting(pyi);
    pyi.use(pyi.router.routes()).use(pyi.router.allowedMethods());
    const ipc = join(config.RUNTIME, config.IPC);
    if (existsSync(ipc)) removeSync(ipc);
    pyi.listen(ipc);
    const app = new Server(socket => {
        socket.on('data', data => {
            // const blen = data.slice(0, 4).readInt32BE();
            // console.log(blen, data.slice(4, 4 + blen).toString());
            const net = connect(ipc);
            net.write(data);
            net.on('data', socket.write.bind(socket));
            net.on('end', socket.end.bind(socket));
        });
    });
    app.listen(config.PORT);
}

export function PYIBootstrap<P extends PYIApplcation>(target: PYIClass<P> & ThisType<P>) {
    bootstrap(target);
    return target;
}

export class PYIApplcation extends PCore {

}