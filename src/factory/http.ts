import { DefaultState, DefaultContext, BaseContext, BaseRequest, BaseResponse } from 'koa';
import { ListenOptions } from 'net';
import { config } from '../composition/configuration';
import { BaseData, Factory, Middleware } from './factory';
import { HTTPApplication } from '../app/http';

export class HTTPFactory<StateT = DefaultState, ContextT = DefaultContext> implements Factory<StateT, ContextT> {
    public context!: BaseContext & ContextT;
    public request!: BaseRequest & BaseData;
    public response!: BaseResponse & BaseData;
    public middleware: Middleware<StateT, ContextT>[];
    public app: HTTPApplication<any, any>;

    public get config() {
        return config;
    }

    constructor() {
        this.middleware = [];
        this.app = new HTTPApplication();
    }

    public use<NewStateT = {}, NewContextT = {}>(middleware: Middleware<StateT & NewStateT, ContextT & NewContextT>) {
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
