import { Context } from 'koa';
import { isRegExp, isString } from 'lodash';
import { PCore } from '../../core/pcore';
import { PYIClass } from '../../core/types';

export const ControllerProperties = Symbol('#CONTROLLERPROPERTIES');
export const ControllerPrefixProperties = Symbol('#CONTROLLERPREFIXPROPERTIES');

export function Controller<P extends PController>(target: any): void;
export function Controller(...prefix: Array<string | RegExp>): <P extends PController>(target: PYIClass<P>) => void;
export function Controller() {
    if (isString(arguments[0]) || isRegExp(arguments[0])) {
        const paths = [...arguments];
        return function <P extends PController>(target: PYIClass<P>) {
            Reflect.defineMetadata(ControllerPrefixProperties, paths, target);
        }
    }
    // console.log(arguments[0]);
    Reflect.defineMetadata(ControllerPrefixProperties, undefined, arguments[0]);
}

export class PController extends PCore {

    public static _root() {
        return PController;
    }

    public static _extends() {
        return PController.prototype;
    }

    public get _root() {
        return PController._root;
    }

    public get _extends() {
        return PController._extends;
    }

    public get ctx() {
        return this.context;
    }

    constructor(public context: Context) {
        super(context);
    }
}

export enum RequestMappingMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH',
    CONNECT = 'CONNECT',
    CHECKOUT = 'CHECKOUT',
    COPY = 'COPY',
    HEAD = 'HEAD',
    LOCK = 'LOCK',
    MERGE = 'MERGE',
    MKACTIVITY = 'MKACTIVITY',
    MKCOL = 'MKCOL',
    MOVE = 'MOVE',
    M_SEARCH = 'm-search',
    NOTIFY = 'NOTIFY',
    OPTIONS = 'OPTIONS',
    PROPFIND = 'PROPFIND',
    PROPPATCH = 'PROPPATCH',
    PURGE = 'PURGE',
    REPORT = 'REPORT',
    SEARCH = 'SEARCH',
    SUBSCRIBE = 'SUBSCRIBE',
    TRACE = 'TRACE',
    UNLOCK = 'UNLOCK',
    UNSUBSCRIBE = 'UNSUBSCRIBE'
}

export interface RequestMappingConfiguration {
    path?: string | RegExp | Array<string | RegExp>;
    methods?: string[] | RequestMappingMethod[];
}

export function routes(target: PController, config: RequestMappingConfiguration, key: string, value: Function) {
    const actions: string[] = Reflect.getMetadata(ControllerProperties, target) || [];
    actions.push(key);
    Reflect.defineMetadata(ControllerProperties, actions, target);
    Reflect.defineMetadata(ControllerProperties, { ...config, value }, target, key);
    return target;
}

export function RequestMapping<P extends PController>(target: P, prototypeKey: string): void;
export function RequestMapping(config: RequestMappingConfiguration): <P extends PController>(target: P, prototypeKey: string, descr: PropertyDescriptor) => void;
export function RequestMapping() {
    if (arguments.length === 1) {
        return function (target: PController, key: string, descr: PropertyDescriptor) {
            routes(target, { path: key, ...arguments[0] }, key, descr.value);
        }
    }
    routes(arguments[0], { path: arguments[1] }, arguments[1], arguments[2].value);
}
