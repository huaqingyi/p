import { env } from '../composition/env';
import { UserDotENV, UserDotENVKey } from '../../example/types/dotenv';
import { PCore } from '../core/pcore';
import { PYIClass } from '../core/types';
import { join } from 'path';
import { isFunction } from 'lodash';

export interface PYIAppConfiguration {
    port: number;
    host: string;
}

export function Configuration<P extends PConfiguration>(target: PYIClass<P> & ThisType<P>) {
    return target;
}

export function properties<P extends PConfiguration>(target: P, key: string): void;
export function properties(prototypeKey?: UserDotENVKey): <P extends PConfiguration>(target: P, key: string) => void;
export function properties(callback: (config: UserDotENV) => any): <P extends PConfiguration>(target: P, key: string) => void;
export function properties() {
    if (arguments.length === 1) {
        return (target: PConfiguration, key: string) => {
            if (isFunction(arguments[0])) {
                const e = arguments[0](env());
                if (e.then && isFunction(e.then)) e.then((v: any) => (target as any)[key] = v);
                else (target as any)[key] = e;
            } else {
                const config = env(arguments[0]);
                (target as any)[key] = config;
            }
        }
    }
    const config = env();
    const [target, key] = arguments;
    target[key] = config;
}

export class PConfiguration extends PCore {

}

export class PYIConfiguration extends PCore {

    constructor() {
        super();
        const that: any = this;
        if (!that.port) that.port = 8080;
        if (!that.host) that.host = '127.0.0.1';
        if (!that.ipc) that.ipc = join(env('RUNTIME'), '.ipc.scok');
    }
}
