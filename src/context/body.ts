import { Context } from 'koa';

declare module 'koa' {
    export interface DefaultContext {
        get<T = any>(): T;
        get<T = any>(k: string): T;
        post<T = any>(): T;
        post<T = any>(k: string): T;
        parma<T = any>(): T;
        parma<T = any>(k: string): T;
    }
}

export const IBodyContext = {
    get(this: Context, k?: string) {
        if (!k) return this.query;
        return this.query[k];
    },
    post(this: Context, k?: string) {
        console.log(this);
        // const data = { ...(this.request.body || {}), ...(this.request.files || {}) };
        // if (!k) return data;
        // return data[k];
        return {};
    },
    param(this: Context, k?: string) {
        if (!k) return this.params;
        return this.params[k];
    },
};
