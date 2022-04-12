import { Next } from 'koa';

export interface BaseData {
    [key: string]: any;
}
export type PMiddleware<T> = (context: T, next: Next) => any;
export type Middleware<StateT = DefaultState, ContextT = DefaultContext, ResponseBodyT = any> = PMiddleware<ParameterizedContext<StateT, ContextT, ResponseBodyT>>;

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