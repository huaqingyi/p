import { Middleware, TCPDefaultContext, TCPDefaultState, TCPRequest, TCPResponse, TMiddleware } from './factory';
import { ListenOptions } from 'net';
import { TCPApplication } from '../app/tcp';
import { config } from '../composition/configuration';
import { PYIConstructor } from '../core/pyi';
import { PTransform } from '../transform';
import { BaseData, Factory } from './factory';

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
    public app: TCPApplication<any, any>;

    public get config() {
        return config;
    }

    constructor() {
        this.middleware = [];
        this.app = new TCPApplication();
    }

    public use<NewStateT = {}, NewContextT = {}>(middleware: TMiddleware<StateT & NewStateT, ContextT & NewContextT>): this;
    public use<P extends PYIConstructor<PTransform>>(middleware: P): this;
    public use(middleware: any) {
        this.app.use(middleware);
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
        /* eslint-disable prefer-rest-params */
        this.app.listen(...arguments);
        return this;
    }
}
