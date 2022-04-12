import { Next, ParameterizedContext } from 'koa';
import { ListenOptions } from 'net';
import { APPConfiguration } from '../core/configuration';
import { Loaded } from '../core/loaded';
import { HTTPFactory } from './http';
import { TCPFactory } from './tcp';

export interface BaseData {
    [key: string]: any;
}
export type PMiddleware<T> = (context: T, next: Next) => any;
export type Middleware<State, Context, Response = any> = PMiddleware<ParameterizedContext<State, Context, Response>>;

export interface Factory<State = any, Context = any> {
    context: any;
    request: any;
    response: any;
    middleware: Middleware<State, Context>[];

    use(middleware: Middleware<State, Context>): Factory<State, Context>;

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

export enum Transport {
    TCP,
    HTTP,
}

export interface PYIFactoryTCPOptions {
    transport?: Transport.TCP;
    options?: {
        host?: string;
        port?: number;
        retryAttempts?: number;
        retryDelay?: number;
    };
}

export interface PYIFactoryOptions {
    host?: string;
    port?: number;
    retryAttempts?: number;
    retryDelay?: number;
}

export interface PYIFactoryHTTPOptions {
    transport?: Transport.HTTP;
    options?: PYIFactoryOptions;
}

export class PFactory {
    public static _root() {
        return PFactory;
    }

    public static create(options: PYIFactoryHTTPOptions): HTTPFactory;
    public static create(options: PYIFactoryTCPOptions): TCPFactory;
    public static create(options: PYIFactoryHTTPOptions | PYIFactoryTCPOptions) {
        if (options.transport !== Transport.TCP && (!options.transport)) {
            options.transport = Transport.HTTP;
        }

        const config = new APPConfiguration();
        const loaded = new Loaded(config.APP_PATH);
        loaded.build();

        switch (options.transport) {
            case Transport.HTTP: return new HTTPFactory(options);
            case Transport.TCP: return new TCPFactory(options);
        }
    }
}
