import Koa from 'koa';
import { env } from '../composition';
import { PCore } from '../core/pcore';
import { PYIClass } from '../core/types';
import { Loaded } from '../core/loaded';
import Router from 'koa-router';

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
    await loaded.mounting();
}

export function PYIBootstrap<P extends PYIApplcation>(target: PYIClass<P> & ThisType<P>) {
    bootstrap(target);
    return target;
}

export class PYIApplcation extends PCore {

}