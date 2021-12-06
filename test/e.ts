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
// import { watch } from 'chokidar';
// import { readFileSync } from 'fs';
// import { statSync, existsSync } from 'fs-extra';
// import { find } from 'lodash';
// import { extname, join } from 'path';

// export async function filepath(dirname: string, ext: RegExp = /^.(ts|tsx|js|jsx|mjs)$/) {
//     const watcher = watch(dirname, {
//         ignored(path: string) {
//             const gitignore = join(dirname, '.gitignore');
//             if (existsSync(gitignore)) {
//                 const ignore = readFileSync(gitignore).toString().split('\n');
//                 const cg = find(ignore, g => (new RegExp(g, 'gi')).test(path));
//                 if (cg) return true;
//             }
//             if (statSync(path).isDirectory()) return false;
//             const filename = extname(path);
//             if (filename) return !ext.test(filename);
//             return true;
//         },
//     });
//     const p: string[] = [];
//     return await new Promise(r => {
//         watcher.on('add', path => p.push(path));
//         watcher.on('ready', async () => {
//             await watcher.close();
//             r(p);
//             console.log(p);
//         });
//     });
// }

// filepath(process.cwd());

// import Koa from 'koa';
// import Router from 'koa-router';

// const app = new Koa();
// const router = new Router({
//     prefix: '/test',
// });
// router.register('/test', ['GET', 'COPY'], ctx => {
//     ctx.body = { name: 111 }
// });
// router.all('/test1', ctx => {
//     ctx.body = { name: 222 }
// })
// const root = new Router();
// root.use(router.routes());
// app.use(root.routes()).use(root.allowedMethods()).listen(3000);

type Ctor<T> = new (...args: any[]) => T

class Name {
    constructor() { }
    consoleMsg() {
        console.log(22222)
    }
}

function auto<T>(className: Ctor<T>) {
    return function (target: any, attr: any) {
　　　　　　// target 是类的原型对象, attr 属性的名称 (url)
        console.log(target);
        console.log(attr);
        console.log(className)
        target[attr] = new className();
    }
}
class Greeter {
    property = "property";
    hello: string;

    @auto(Name)
    newProperty!: Name

    constructor(hello: string) {
        this.hello = hello
    }

    getMsg() {
        console.log(123, this.newProperty)
        // this.newProperty.consoleMsg()
    }
}
new Greeter('你好').getMsg();
