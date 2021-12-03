import { isFunction, map } from 'lodash';
import { Application } from '../decorators/application';
import { filepath } from '../composition';
import { IPlugin, PCore } from './pcore';

export class Loaded extends PCore implements IPlugin {
    public static _root() {
        return Loaded;
    }

    constructor(public apath: string) {
        super();
    }

    public async mounting() {
        const paths = await filepath(this.apath);

        return await Promise.all(map(paths, async path => {
            const comps = await import(path);
            map(comps, comp => {
                const _core = comp._core && isFunction(comp._core) ? comp._core : false;
                if (_core === false) return comp;
                if ([Application, PCore].indexOf(_core) !== -1) comp._filepath = path;
                return comp;
            });
            return comps;
        }));
    }
}
