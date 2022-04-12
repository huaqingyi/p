import { Configuration, PYIAPPConfiguration, PYIFactoryOptions } from '../../src';
import { join } from 'path';

@Configuration
export class ApplicationConfiguration extends PYIAPPConfiguration implements PYIFactoryOptions {

    public host: string;
    public port: number;
    public retryAttempts: number;
    public retryDelay: number;

    constructor() {
        super();
        this.host = '127.0.0.1';
        this.port = 3000;
        this.retryAttempts = 3;
        this.retryDelay = 5000;
    }
}
