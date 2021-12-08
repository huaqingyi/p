import { isArray, isFunction, map } from 'lodash';
import { Application } from '../decorators/application';
import { filepath } from '../composition';
import { IPlugin, PCore, FILEPATH } from './pcore';
import Router from 'koa-router';
import { PYIClass } from './types';
import { PController, ControllerPrefixProperties, ControllerProperties } from '../decorators/controller/controller';
import { basename, extname } from 'path';

export class Loaded extends PCore implements IPlugin {
    public static _root() {
        return Loaded;
    }

    constructor(public apath: string) {
        super();
    }

    public prefix<P extends PController>(target: PYIClass<P>) {
        const prefix = Reflect.getMetadata(ControllerPrefixProperties, target);
        if (prefix) return prefix;
        const path: string = Reflect.getMetadata(FILEPATH, target);
        let fname = basename(path).replace(extname(path), '');
        fname = ['controller', 'index'].indexOf(fname) === -1 ? fname : '';
        let cname = path.replace(this.apath, '');
        cname = cname.slice(0, 1) === '/' ? cname.slice(1) : cname;
        cname = cname.split('/').length !== 1 ? cname.split('/').slice(1).join('/') : cname;
        cname = cname.replace(basename(path), '');
        cname = cname.slice(-1) === '/' ? cname.slice(0, -1) : cname;
        if (!fname) return [`/${cname}`];
        else return [`/${cname}/${fname}`];
    }

    public roouter<P extends PController>(target: PYIClass<P> & any) {
        const prefixs = this.prefix(target);
        const routes = map(prefixs, prefix => new Router({ prefix }));
        const actions = Reflect.getMetadata(ControllerProperties, target.prototype);
        map(actions, action => {
            const config = Reflect.getMetadata(ControllerProperties, target.prototype, action);
            if (!isArray(config.path)) config.path = [config.path];
            return map(config.path, p => {
                p = p.slice(0, 1) === '/' ? p : `/${p}`;
                if (config.methods && config.methods !== 0) {
                    return map(routes, route => route.register(p, config.methods, (ctx, next) => {
                        const control = new target(ctx);
                        return next().then(() => config.value.apply(control, [ctx, next]));
                    }));
                }
                return map(routes, route => route.all(p, (ctx, next) => {
                    const control = new target(ctx);
                    return next().then(() => config.value.apply(control, [ctx, next]));
                }));
            });
        });
        map(routes, route => this.app.router.use(route.routes()));
        return target;
    }

    // public async injector<P extends PCore>(target: PYIClass<P> & any, app: Application) {
    //     const injs = Reflect.getMetadata(AutowiredProperties, target.prototype);
    //     if (!injs) return injs;
    //     map(injs, inj => {
    //         const Component = Reflect.getMetadata('design:type', target.prototype, inj);
    //         const config = Reflect.getMetadata(AutowiredConfigurationProperties, target.prototype, inj);
    //         target.prototype[inj] = config ? new Component(config) : new Component();
    //         console.log(target.prototype);
    //     });
    //     // const Component = Reflect.getMetadata('design:type', arguments[0], arguments[1]);
    //     // const component = new Component();
    //     // console.log(111, component);
    //     // Object.defineProperty(arguments[0], arguments[1], {
    //     //     get: () => component, enumerable: true, configurable: true,
    //     // });
    // }

    public async mounting(app: Application) {
        const paths = await filepath(this.apath);

        return await Promise.all(map(paths, async path => {
            const comps = await import(path);
            await Promise.all(map(comps, async (comp, f) => {
                const _core = comp._core && isFunction(comp._core) ? comp._core : false;
                if (_core === false) return comp;
                // await this.injector(comp, app);
                if ([Application, PCore].indexOf(_core()) !== -1) Reflect.defineMetadata(FILEPATH, path, comp);
                if (comp._root && PController === comp._root()) this.roouter(comp);
                return comp;
            }));
            return comps;
        }));
    }
}
