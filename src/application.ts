import { PYI } from './core';

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

export interface PYIFactoryHTTPOptions {
    transport?: Transport.HTTP;
    options?: {
        host?: string;
        port?: number;
        retryAttempts?: number;
        retryDelay?: number;
    };
}

export class PYIFactory extends PYI {
    public static _root() {
        return PYIFactory;
    }

    public static create(options: PYIFactoryHTTPOptions): any;
    public static create(options: PYIFactoryTCPOptions): any;
    public static create() {
        // ...
    }
}
