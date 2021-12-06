import { Application } from '../decorators/application';

export interface PYICore {

}

export interface IPlugin {
    mounting(app: Application): any;
}

export const FILEPATH = Symbol('#FILEPATH');

export abstract class PCore implements PYICore {

    public static _core() {
        return PCore;
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
}
