import { isFunction } from 'lodash';
import { PYI, PYIConstructor } from '../core/pyi';

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    COPY = 'COPY',
    LINK = 'LINK',
    UNLINK = 'UNLINK',
    OPTION = 'OPTION',
    RPC = 'RPC',
    TCP = 'TCP',
}

export interface PropsController {
    methods?: Array<RequestMethods | string>;
    path?: string | string[];
}

export class PYIController extends PYI {
    public static _root() {
        return PYIController;
    }
}

export function Controller<VC extends PYIConstructor<PYIController>>(target: VC): VC;
export function Controller<C extends PYIController>(options: PropsController & ThisType<C>): <VC extends PYIConstructor<PYIController>>(target: VC) => VC;
export function Controller() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (args[0]._root && isFunction(args[0]._root) && args[0]._root() === PYIController) {
        const [target] = args;
        return target;
    }
    return <VC extends PYIConstructor<PYIController>>(target: VC) => {
        const [props] = args;
        console.log(props);
        return target;
    };
}

export interface ResquestMappingOption {
    methods?: Array<RequestMethods | string>;
    path?: string | string[];
}

export function RequestMapping(option: ResquestMappingOption): (target: PYIController, propertyKey: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export function RequestMapping(target: PYIController, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor;
export function RequestMapping() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (args[0]._root && isFunction(args[0]._root) && args[0]._root() === PYIController) {
        const [target, propertyKey, descriptor] = args;
        console.log(target, propertyKey, descriptor);
        return descriptor;
    }
    return (target: PYIController, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const [props] = args;
        console.log(props, target, propertyKey, descriptor);
        return descriptor;
    };
}
