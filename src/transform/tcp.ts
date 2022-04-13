import { map } from 'lodash';
import { TCPRequest } from '../factory/factory';
import { PTransform } from './transform';

export class TCPTransform extends PTransform {
    public static _root() {
        return TCPTransform;
    }

    public _pipe: Function[];

    constructor() {
        super();
        this._pipe = [];
    }

    public write(buffer: Buffer): boolean {
        this.buffer = Buffer.concat([this.buffer, buffer]);
        const len = this.buffer.slice(0, 4).readInt32BE();
        if (this.buffer.length >= 4 + len) {
            const request: TCPRequest = JSON.parse(this.buffer.slice(4, 4 + len).toString());
            this.buffer = this.buffer.slice(4 + len);
            if (this.buffer.length > 4) return true;
            map(this._pipe, pipe => pipe(request));
            return true;
        }
        return true;
    }

    public pipe(callback: Function) {
        this._pipe.push(callback);
    }
}
