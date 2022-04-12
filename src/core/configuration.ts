import { join } from 'lodash';
import { dirname } from 'path';

export class APPConfiguration {
    public APP_PATH: string;
    public RUNTIME: string;

    constructor() {
        this.APP_PATH = dirname(process.argv[1]);
        this.RUNTIME = join(this.APP_PATH, '.runtime');
    }
}
