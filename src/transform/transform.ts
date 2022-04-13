import { PYI } from '../core/pyi';

export interface Transform<T = any> {
    read(): T;
    write(buffer: Buffer): boolean;
}

export class PTransform extends PYI implements Transform {
    public static _root() {
        return PTransform;
    }

    public buffer: Buffer;
    constructor() {
        super();
        this.buffer = Buffer.from([]);
    }

    public write(buffer: Buffer) {
        this.buffer = Buffer.concat([this.buffer, buffer]);
        return true;
    }

    public read() {
        return this.buffer;
    }
}
