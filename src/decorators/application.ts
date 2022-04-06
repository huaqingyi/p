import { PYI } from '../core/pyi';

export interface OnMount {
    onMount?(): any | Promise<any>;
}

export interface OnUpdate {
    onUpdate?(): any | Promise<any>;
}

export interface OnCatch {
    onCatch?(): any | Promise<any>;
}

export class PYIApplication extends PYI {
    public static _root() {
        return PYIApplication;
    }
}
