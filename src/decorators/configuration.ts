import { env } from '../composition/env';
import { UserDotENV, UserDotENVKey } from '../composition/env';
import { PCore } from '../core/pcore';
import { isFunction } from 'lodash';

export type PYIConfiguration<V> = {
    new(): V & PConfiguration;
} & typeof PConfiguration;

export interface PYIAppConfiguration {
    port: number;
    host: string;
}

export function Configuration<P extends PConfiguration>(target: PYIConfiguration<P> & ThisType<P>) {
    return target;
}

export function properties<P extends PConfiguration>(target: P, key: string): void;
export function properties(prototypeKey?: UserDotENVKey): <P extends PConfiguration>(target: P, key: string) => void;
export function properties(callback: (config: UserDotENV) => any): <P extends PConfiguration>(target: P, key: string) => void;
export function properties() {
    if (arguments.length === 1) {
        return (target: PConfiguration & any, key: string) => {
            if (isFunction(arguments[0])) {
                const e = arguments[0](env());
                if (e.then && isFunction(e.then)) e.then((v: any) => target[key] = v);
                else target[key] = e;
            } else {
                const config = env(arguments[0]);
                target[key] = config;
            }
        }
    }
    const config = env();
    const [target, key] = arguments;
    target[key] = config;
}

export function resource<P extends PCore>(target: P & any, key: string) {
    const Configuration = Reflect.getMetadata('design:type', target, key);
    const { _root } = Configuration;
    if (_root && isFunction(_root) && _root() === PConfiguration) {
        target[key] = new Configuration();
    } else {
        throw new Error(`resource injection need PConfiguration classess ...`);
    }
}

export class PConfiguration extends PCore {

    public static _root() {
        return PConfiguration;
    }

    public static _extends() {
        return PConfiguration.prototype;
    }

    public get _root() {
        return PConfiguration._root;
    }

    public get _extends() {
        return PConfiguration._extends;
    }
}
