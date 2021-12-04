import { Application } from '../decorators/application';

export interface PYICore {

}

export interface IPlugin {
    mounting(): any;
}

export const FILEPATH = Symbol('#FILEPATH');

export abstract class PCore implements PYICore {

    public static _core() {
        return PCore;
    }

    public static _root() {
        return PCore;
    }

    public static _extends() {
        return PCore.prototype;
    }

    public get _root() {
        return PCore._root;
    }

    public get _extends() {
        return PCore._extends;
    }

    public get pyi() {
        return Application.pyi;
    }

    public set pyi(pyi) {
        Application.pyi = pyi;
    }

    public get app() {
        return Application.pyi;
    }

    public set app(pyi) {
        Application.pyi = pyi;
    }

    constructor(...props: any[]) { }
}
