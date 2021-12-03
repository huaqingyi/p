// import { config } from 'dotenv';
// import { join } from 'path';

// let midx = process.argv.indexOf('--mode');
// midx = midx === -1 ? process.argv.indexOf('-m') : midx;
// const env = midx === -1 ? '' : process.argv.slice(midx + 1, midx + 2).pop();

// console.log(config({ path: join(process.cwd(), `.env${env ? `.${env}` : ''}`) }));
// console.log(process.cwd());
// import Koa from 'koa';
// import Router from 'koa-router';
// import { map } from 'lodash';

// const app = new Koa();
// const router = new Router();

// map(Array.from({ length: 10000 }), (_, i) => {
//     router.all(`/${i}`, async (ctx, next) => {
//         ctx.body = i;
//         await next();
//     });
//     if (i === 10000 - 1) app.use(router.routes()).listen(3000);
// });
import { watch } from 'chokidar';
import { readFileSync } from 'fs';
import { statSync, existsSync } from 'fs-extra';
import { find } from 'lodash';
import { extname, join } from 'path';

export async function filepath(dirname: string, ext: RegExp = /^.(ts|tsx|js|jsx|mjs)$/) {
    const watcher = watch(dirname, {
        ignored(path: string) {
            const gitignore = join(dirname, '.gitignore');
            if (existsSync(gitignore)) {
                const ignore = readFileSync(gitignore).toString().split('\n');
                const cg = find(ignore, g => (new RegExp(g, 'gi')).test(path));
                if (cg) return true;
            }
            if (statSync(path).isDirectory()) return false;
            const filename = extname(path);
            if (filename) return !ext.test(filename);
            return true;
        },
    });
    const p: string[] = [];
    return await new Promise(r => {
        watcher.on('add', path => p.push(path));
        watcher.on('ready', async () => {
            await watcher.close();
            r(p);
            console.log(p);
        });
    });
}

filepath(process.cwd());
