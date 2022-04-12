import { Next, ParameterizedContext } from 'koa';
import { ListenOptions, Socket } from 'net';

export type TCPDefaultStateExtends = any;
export interface TCPDefaultState extends TCPDefaultStateExtends {
    [key: string]: any;
}

export type TCPDefaultContextExtends = {};
export interface TCPDefaultContext extends TCPDefaultContextExtends {
    [key: string]: any;
}

export interface TCPBaseData {
    [key: string]: any;
}
export type PMiddleware<T> = (context: T, next: Next) => any;
export type Middleware<StateT = TCPDefaultState, ContextT = TCPDefaultContext, ResponseBodyT = any> = PMiddleware<ParameterizedContext<StateT, ContextT, ResponseBodyT>>;

export interface Factory<StateT = TCPDefaultState, ContextT = TCPDefaultContext> {
    context: any;
    request: any;
    response: any;
    middleware: Middleware<any, any>[];

    use<NewStateT = {}, NewContextT = {}>(middleware: Middleware<StateT & NewStateT, ContextT & NewContextT>): Factory<StateT & NewStateT, ContextT & NewContextT>;

    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): Factory;
    listen(port: number, hostname?: string, listeningListener?: () => void): Factory;
    listen(port: number, backlog?: number, listeningListener?: () => void): Factory;
    listen(port: number, listeningListener?: () => void): Factory;
    listen(path: string, backlog?: number, listeningListener?: () => void): Factory;
    listen(path: string, listeningListener?: () => void): Factory;
    listen(options: ListenOptions, listeningListener?: () => void): Factory;
    listen(handle: any, backlog?: number, listeningListener?: () => void): Factory;
    listen(handle: any, listeningListener?: () => void): Factory;
}

export interface TCPRequest {
    cmd: string;
    data: TCPBaseData;
}

export interface TCPResponse {
    socket: Socket;
    data: TCPBaseData;
}

export interface TCPBaseContext extends TCPRequest, TCPResponse {
    throw(message: string, code?: number, properties?: {}): never;
    throw(status: number): never;
    throw(...properties: Array<number | string | {}>): never;
    onerror(err: Error): void;
}

export abstract class PFactory<StateT = TCPDefaultState, ContextT = TCPDefaultContext> implements Factory<StateT, ContextT> {
    public context!: TCPBaseContext & ContextT;
    public request!: TCPRequest & TCPBaseData;
    public response!: TCPResponse & TCPBaseData;
    public middleware: Middleware<StateT, ContextT>[];

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
        return this;
    }
}
