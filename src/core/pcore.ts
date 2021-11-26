export interface PYICore {

}

export abstract class PCore implements PYICore {
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
}
