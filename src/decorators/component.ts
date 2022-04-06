import { isFunction } from 'lodash';
import { mixin } from '../composition';
import { PYI, PYIConstructor } from '../core/pyi';

export class PYIComponent extends PYI {
    public static _root() {
        return PYIComponent;
    }

    public static mixin<T extends Function>(withed: T): PYIComponent & T {
        return mixin(PYIComponent, withed);
    }
}

export interface PropsComponent {
    path: string | string[];
}

export function Component<VC extends PYIConstructor<any>>(target: VC): VC;
export function Component<C extends PYIComponent>(options: PropsComponent & ThisType<C>): <VC extends PYIConstructor<PYIComponent>>(target: VC) => VC;
export function Component() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (args[0]._root && isFunction(args[0]._root) && args[0]._root() === PYIComponent) {
        const [target] = args;
        return target;
    }
    return <VC extends PYIConstructor<PYIComponent>>(target: VC) => {
        const [props] = args;
        console.log(props);
        return target;
    };
}

export interface AutowiredOption {
    global?: boolean;
}

export function autowired(options: AutowiredOption): (target: PYI, propertyKey: string | symbol) => void;
export function autowired(target: PYI, propertyKey: string | symbol): void;
export function autowired() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (args[0]._ && isFunction(args[0]._) && args[0]._() === PYI) {
        const [target, propertyKey] = args;
        console.log(target, propertyKey);
    }
    return (target: PYI, propertyKey: string | symbol) => {
        const [props] = args;
        console.log(props, target, propertyKey);
    };
}
