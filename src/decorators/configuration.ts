import { env } from '../composition/env';
import { UserDotENV, UserDotENVKey } from '../../example/types/dotenv';
import { PCore } from '../core/pcore';
import { PYIClass } from '../core/types';
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
    target[key] = new Configuration();
}

export class PConfiguration extends PCore {

}
