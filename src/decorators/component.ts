import { PCore } from '../core/pcore';
import { PYIClass } from '../core/types';

export function Component<P extends PComponent>(target: PYIClass<P> & ThisType<P>) {
    // console.log(target);
    // const actions: string[] = Reflect.getMetadata(AutowiredProperties, target.prototype) || [];
    // console.log(actions);
    return target;
}

export class PComponent extends PCore {

}

export const AutowiredProperties = Symbol('#AUTOWIREDPROPERTIES');
export const AutowiredConfigurationProperties = Symbol('#AUTOWIREDCONFIGURAITONPROPERTIES');
export function autowiredProperties<P extends PComponent>(target: P & any, key: string, config?: object) {
    const Component = Reflect.getMetadata('design:type', target, key);
    let component: any;
    const proxy = new Proxy({}, {
        get: (t: any, k) => {
            if (t[k]) return t[k];
            if (!component) component = new Component(config);
            return component[k];
        },
        set: (t, k, v) => {
            t[k] = v;
            return true;
        },
    });
    target[key] = proxy;
}

export function autowired<T = any>(config: T): <P extends PComponent>(target: P, key: string) => void;
export function autowired<P extends PComponent>(target: P, key: string): void;
export function autowired() {
    if (arguments.length === 1) {
        const [config] = arguments;
        return function <P extends PComponent>(target: P & any, key: string) {
            // autowiredProperties(target, key, config);
            target[key] = '111';
        }
    }
    // autowiredProperties(arguments[0], arguments[1]);
    arguments[0][arguments[1]] = '111';
}
