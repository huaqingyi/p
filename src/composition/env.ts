import { PCore } from '../core';
import { config } from 'dotenv';
import { join } from 'path';
import { existsSync, mkdirpSync, writeFileSync } from 'fs-extra';
import { isNaN, map } from 'lodash';

export interface UserDotENV {
    [x: string]: any;
}

export type UserDotENVKey = 'RUNTIME' | 'TYPES' | 'APP_PATH' | any;

export class DotENV extends PCore {
    [x: string]: any;
    public static $self: DotENV;
    public static _root() {
        return DotENV;
    }

    public static _extends() {
        return DotENV.prototype;
    }

    public get _root() {
        return DotENV._root;
    }

    public get _extends() {
        return DotENV._extends;
    }

    protected static _config: object;

    public get config() {
        return DotENV._config;
    }

    public set config(config) {
        DotENV._config = config;
    }

    public RUNTIME!: string;
    public TYPES!: string;
    public APP_PATH!: string;

    constructor() {
        super();
        if (DotENV.$self) return DotENV.$self;
        this.RUNTIME = join(process.cwd(), 'runtime');
        this.TYPES = join(process.cwd(), 'types');
        if (!existsSync(this.RUNTIME)) mkdirpSync(this.RUNTIME);
        if (!existsSync(this.TYPES)) mkdirpSync(this.TYPES);
        this.APP_PATH = process.cwd();
        let midx = process.argv.indexOf('--mode');
        midx = midx === -1 ? process.argv.indexOf('-m') : midx;
        const env = midx === -1 ? '' : process.argv.slice(midx + 1, midx + 2).pop();
        const path = join(process.cwd(), `.env${env ? `.${env}` : ''}`);
        if (!existsSync(path)) throw new Error(`No environment configured ...`);
        const _config: any = config({ path }).parsed || {};
        DotENV._config = _config;
        DotENV.$self = this.proxy(DotENV._config);
        return DotENV.$self;
    }

    public proxy(_config: any) {
        const c = new Proxy(this, {
            get: (target: any, key) => target[key] || target.config[key],
            set: (target, key, value) => {
                target[key] = value;
                return true;
            },
        });
        const keys = Object.keys(this).concat(Object.keys(_config));
        const content = map(keys, k => {
            const v = c[k];
            if (!isNaN(Number(v))) {
                _config[k] = Number(v);
                c[k] = _config[k];
                return `\t${k}: number;`
            }
            if (['true', 'false'].indexOf(v) !== -1) {
                _config[k] = Boolean(v);
                c[k] = _config[k];
                return `\t${k}: boolean;`
            }
            if (_config[k]) c[k] = _config[k];
            return `\t${k}: string;`;
        });
        writeFileSync(join(c.TYPES, 'dotenv.d.ts'), [
            `declare interface UserDotENV {`, ...content, `}`,
            `export type UserDotENVKey = ${map(keys, k => `'${k}'`).join(' | ')};`,
        ].join('\n'));
        return c;
    }
}

export function env(): UserDotENV;
export function env<T>(prototypeKey?: UserDotENVKey): T;
export function env() {
    const dotenv = new DotENV();
    const [prototypeKey] = arguments;
    if (prototypeKey) return dotenv[prototypeKey];
    return dotenv;
}
