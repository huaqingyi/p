import { isFunction } from 'lodash';
import { PYI, PYIConstructor } from '../core/pyi';

export class PYIService extends PYI {
    public static _root() {
        return PYIService;
    }
}

export interface PropsService {
    path: string | string[];
}

export function Service<VC extends PYIConstructor<PYIService>>(target: VC): VC;
export function Service<C extends PYIService>(options: PropsService & ThisType<C>): <VC extends PYIConstructor<PYIService>>(target: VC) => VC;
export function Service() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (args[0]._root && isFunction(args[0]._root) && args[0]._root() === PYIService) {
        const [target] = args;
        return target;
    }
    return <VC extends PYIConstructor<PYIService>>(target: VC) => {
        const [props] = args;
        console.log(props);
        return target;
    };
}
