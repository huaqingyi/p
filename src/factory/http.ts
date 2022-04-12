import { DefaultState, DefaultContext, ParameterizedContext, Next, BaseContext, BaseRequest, BaseResponse } from 'koa';
import { ListenOptions } from 'net';

export interface Factory<StateT = DefaultState, ContextT = DefaultContext> {
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

export abstract class PFactory<StateT = DefaultState, ContextT = DefaultContext> implements Factory<StateT, ContextT> {
    public context!: BaseContext & ContextT;
    public request!: BaseRequest & BaseData;
    public response!: BaseResponse & BaseData;
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
