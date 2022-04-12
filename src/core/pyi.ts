export declare interface PYIConstructor<V extends PYI> {
    new(...args: any[]): V;
}

export type PYIPropsType = string | number | boolean | object | Function | {};

export interface PYIProps {
    [name: string]: PYIPropsType | PYIPropsType[];
}

export class PYI<Props = PYIProps> {
    public static _(): PYI {
        return PYI;
    }

    public static _root(): PYI {
        return PYI;
    }

    public static _extends(): PYI {
        return this.prototype;
    }

    public static _filepath: string;

    public _() {
        return Object.assign(this.constructor)._();
    }

    public _root() {
        return Object.assign(this.constructor)._root();
    }

    public _extends() {
        return Object.assign(this.constructor)._extends();
    }

    public get _filepath(): string {
        return Object.assign(this.constructor)._filepath;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_props?: Props) {
        // ...
    }
}
