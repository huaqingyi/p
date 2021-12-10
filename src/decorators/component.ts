import { PCore } from '../core/pcore';

export type PYIComponent<V> = {
    new(): V & PComponent;
} & typeof PComponent;

export function Component<P extends PComponent>(target: PYIComponent<P> & ThisType<P>) {
    return target;
}

export class PComponent extends PCore {

    public static _root() {
        return PComponent;
    }

    public static _extends() {
        return PComponent.prototype;
    }

    public get _root() {
        return PComponent._root;
    }

    public get _extends() {
        return PComponent._extends;
    }

}

export function wired<P extends PComponent>(target: P & any, key: string, config?: any) {
    const Component = Reflect.getMetadata('design:type', target, key);
    target[key] = new Component(config);
    return target[key];
}

export function autowired<T = any>(config: T): (target: object, key: string) => void;
export function autowired(target: object, key: string): void;
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
