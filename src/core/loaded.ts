import { PYI } from './pyi';
import { lstatSync } from 'fs';
import { watch } from 'chokidar';
import { extname } from 'path';
import { isFunction, map } from 'lodash';

export class Loaded extends PYI {
    public static _root() {
        return Loaded;
    }

    public compositions: PYI[];
    public mcompositions: Map<PYI, PYI[]>;
    public files: string[];

    constructor(public path: string) {
        super();
        this.files = [];
        this.compositions = [];
        this.mcompositions = new Map();
    }

    public async build() {
        console.log(process.env.MODE);
        // this.files = await new Promise(resolve => {
        //     const files: string[] = [];
        //     const w = watch(this.path, {
        //         ignored: path => {
        //             if (lstatSync(path).isDirectory()) return false;
        //             return !['.ts', '.tsx', '.mjs', '.js', '.jsx'].includes(extname(path));
        //         },
        //     });
        //     w.on('add', async path => {
        //         files.push(path);
        //         try {
        //             const compositions = await import(path);
        //             map(compositions, composition => {
        //                 // console.log(111, path, composition);
        //                 const { _root } = composition;
        //                 if (_root && isFunction(_root)) {
        //                     const s: PYI[] = this.mcompositions.get(_root()) || [];
        //                     s.push(composition);
        //                     this.mcompositions.set(_root(), s);
        //                 }
        //                 composition._filepath = path;
        //                 this.compositions.push(composition);
        //             });
        //         } catch (err) { }
        //     }).on('ready', () => w.close().then(() => resolve(files)));
        // });
        // console.log(this.files, this.compositions, this.mcompositions);
    }
}
