import { isFunction, map } from 'lodash';
import { Server, Socket } from 'net';
import { PYIConstructor } from '../core/pyi';
import { TCPDefaultContext, TCPDefaultState, TCPRequest, TMiddleware } from '../factory/factory';
import { PTransform, TCPTransform } from '../transform';

export class TCPApplication<State = TCPDefaultState, Context = TCPDefaultContext> extends Server {
    public socket: Socket;
    public transform: TCPTransform;
    public middleware: TMiddleware<State, Context>[];

    constructor() {
        super(socket => {
            this.socket = socket;
            this.socket.on('data', this.transform.write.bind(this.transform));
        });
        this.socket = new Socket();
        this.transform = new TCPTransform();
        this.middleware = [];
    }

    public use<NewStateT = {}, NewContextT = {}>(middleware: TMiddleware<State & NewStateT, Context & NewContextT>): this;
    public use<P extends PYIConstructor<PTransform>>(middleware: P): this;
    public use(middleware: any) {
        if (middleware._root && isFunction(middleware._root) && middleware._root() === TCPTransform) {
            const m: TCPTransform = new middleware();
            m.pipe(this.requested.bind(this));
            this.transform = m;
        } else this.middleware.push(middleware);
        return this;
    }

    public async requested(request: TCPRequest) {
        const middleware = this.middleware.slice();
        const p = Promise.resolve(request);
        map(middleware, m => {
            return p.then(request => {
                return new Promise(async next => {
                    const mr = await m(request as any, next as any);
                    return await next(mr);
                });
            });
        });
        // console.log(123, request);
        return await p;
    }
}
