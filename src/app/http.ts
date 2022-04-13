import Koa, { DefaultContext, DefaultState } from 'koa';

export class HTTPApplication<State = DefaultState, Context = DefaultContext> extends Koa<State, Context> {
    // ...
}
