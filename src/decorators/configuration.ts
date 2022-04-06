import { isFunction } from 'lodash';
import { PYI, PYIConstructor } from '../core/pyi';

export class PYIConfiguration extends PYI {
    public static _root() {
        return PYIConfiguration;
    }
}

export interface PropsConfiguration {
    path: string | string[];
}

export function Configuration<VC extends PYIConstructor<PYIConfiguration>>(target: VC): VC;
export function Configuration<C extends PYIConfiguration>(options: PropsConfiguration & ThisType<C>): <VC extends PYIConstructor<PYIConfiguration>>(target: VC) => VC;
export function Configuration() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (args[0]._root && isFunction(args[0]._root) && args[0]._root() === PYIConfiguration) {
        const [target] = args;
        return target;
    }
    return <VC extends PYIConstructor<PYIConfiguration>>(target: VC) => {
        const [props] = args;
        console.log(props);
        return target;
    };
}
