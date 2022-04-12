import { DefaultState, DefaultContext, BaseContext, BaseRequest, BaseResponse } from 'koa';
import { ListenOptions } from 'net';
import { BaseData, Factory, Middleware, PYIFactoryHTTPOptions } from './factory';

export class HTTPFactory<StateT = DefaultState, ContextT = DefaultContext> implements Factory<StateT, ContextT> {
    public context!: BaseContext & ContextT;
    public request!: BaseRequest & BaseData;
    public response!: BaseResponse & BaseData;
    public middleware: Middleware<StateT, ContextT>[];

    constructor(public config: PYIFactoryHTTPOptions) {
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
