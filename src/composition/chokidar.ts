import { watch } from 'chokidar';
import { readFileSync } from 'fs';
import { statSync, existsSync } from 'fs-extra';
import { find } from 'lodash';
import { join, extname } from 'path';

export async function filepath(dirname: string, ext: RegExp = /^.(ts|tsx|js|jsx|mjs)$/): Promise<string[]> {
    const watcher = watch(dirname, {
        ignored(path: string) {
            const gitignore = join(dirname, '.gitignore');
            if (existsSync(gitignore)) {
                const ignore = readFileSync(gitignore).toString().split('\n');
                const cg = find(ignore, g => (new RegExp(g, 'gi')).test(path));
                if (cg) return true;
            }
            if (statSync(path).isDirectory()) return false;
            if (/\.d\.ts$/.test(path)) return true;
            const filename = extname(path);
            if (filename) return !ext.test(filename);
            return true;
        },
    });
    const p: string[] = [];
    return await new Promise(r => {
        watcher.on('add', path => p.push(path));
        watcher.on('ready', async () => {
            r(p);
            await watcher.close();
        });
    });
}
