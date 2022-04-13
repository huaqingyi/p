import { Middleware } from 'koa';
import { ListenOptions, Socket } from 'net';
import { config } from '../composition/configuration';
import { PYIAPPConfiguration } from '../decorators';
import { BaseData, Factory } from './factory';

export type TCPDefaultStateExtends = any;
export interface TCPDefaultState extends TCPDefaultStateExtends {
    [key: string]: any;
}

export type TCPDefaultContextExtends = {};
export interface TCPDefaultContext extends TCPDefaultContextExtends {
    [key: string]: any;
}

export interface TCPRequest {
    cmd: string;
    data: BaseData;
}

export interface TCPResponse {
    socket: Socket;
    data: BaseData;
}

export interface TCPBaseContext extends TCPRequest, TCPResponse {
    throw(message: string, code?: number, properties?: {}): never;
    throw(status: number): never;
    throw(...properties: Array<number | string | {}>): never;
    onerror(err: Error): void;
}

export class TCPFactory<StateT = TCPDefaultState, ContextT = TCPDefaultContext> implements Factory<StateT, ContextT> {
    public context!: TCPBaseContext & ContextT;
    public request!: TCPRequest & BaseData;
    public response!: TCPResponse & BaseData;
    public middleware: Middleware<StateT, ContextT>[];

    public get config() {
        return config;
    }

    constructor() {
        this.middleware = [];
    }

    public use<NewStateT = {}, NewContextT = {}>(middleware: Middleware<StateT & NewStateT, ContextT & NewContextT>) {
        console.log(middleware);
        return this;
    }

    public listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): this;
    public listen(port: number, hostname?: string, listeningListener?: () => void): this;
    public listen(port: number, backlog?: number, listeningListener?: () => void): this;
    public listen(port: number, listeningListener?: () => void): this;
    public listen(path: string, backlog?: number, listeningListener?: () => void): this;
    public listen(path: string, listeningListener?: () => void): this;
    public listen(options: ListenOptions, listeningListener?: () => void): this;
    public listen(handle: any, backlog?: number, listeningListener?: () => void): this;
    public listen(handle: any, listeningListener?: () => void): this;
    public listen() {
        console.log(321321, this.config(PYIAPPConfiguration));
        return this;
    }
}
