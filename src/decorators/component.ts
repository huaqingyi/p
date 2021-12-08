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

export function autowired<T = any>(config: T): <P extends PComponent>(target: P, key: string) => void;
export function autowired<P extends PComponent>(target: P, key: string): void;
export function autowired() {
    if (arguments.length === 1) {
        const [config] = arguments;
        return function <P extends PComponent>(target: P & any, key: string) {
            const Component = Reflect.getMetadata('design:type', target, key);
            target[key] = new Component(config);
            return target[key];
        }
    }
    const [target, key] = arguments;
    const Component = Reflect.getMetadata('design:type', target, key);
    target[key] = new Component();
    return target[key];
}
