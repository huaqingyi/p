import { watch } from 'chokidar';
import { lstatSync } from 'fs';
import { isFunction, map } from 'lodash';
import { extname } from 'path';
import { PYI, PYIConstructor } from './pyi';

export class Loaded extends PYI {
    public static _root() {
        return Loaded;
    }

    public compositions: PYIConstructor<PYI>[];
    public mcompositions: Map<PYIConstructor<PYI>, PYIConstructor<PYI>[]>;
    public files: string[];

    constructor(public path: string) {
        super();
        this.files = [];
        this.compositions = [];
        this.mcompositions = new Map();
    }

    public async build() {
        this.files = await new Promise(resolve => {
            const files: string[] = [];
            const w = watch(this.path, {
                ignored: path => {
                    if (lstatSync(path).isDirectory()) return false;
                    return !['.ts', '.tsx', '.mjs', '.js', '.jsx'].includes(extname(path));
                },
            });
            w.on('add', async path => {
                files.push(path);
                try {
                    const compositions = await import(path);
                    map(compositions, composition => {
                        // console.log(111, path, composition);
                        const { _root } = composition;
                        if (_root && isFunction(_root)) {
                            const s: PYIConstructor<PYI>[] = this.mcompositions.get(_root()) || [];
                            s.push(composition);
                            this.mcompositions.set(_root(), s);
                        }
                        composition._filepath = path;
                        this.compositions.push(composition);
                    });
                } catch (err) {}
            }).on('ready', () => w.close().then(() => resolve(files)));
        });
        return this;
    }
}
