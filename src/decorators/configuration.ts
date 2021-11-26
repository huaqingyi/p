import { PCore, PYIClass } from '../core';

export interface PYIAppConfiguration {
    port: number;
    host: string;
}

export function Configuration<P extends PConfiguration>(target: PYIClass<P> & ThisType<P>) {
    return target;
}

export class PConfiguration extends PCore {

}

export class PYIConfiguration extends PCore {
    public port: number;
    public host: string;

    constructor() {
        super();
        this.port = 8080;
        this.host = '127.0.0.1';
    }
}
