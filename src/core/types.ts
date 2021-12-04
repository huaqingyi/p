import { PCore } from './pcore';

export type PYIClass<V> = {
    new (): V & PCore;
    new (props: any): V & PCore;
    new (...args: any[]): V & PCore;
} & typeof PCore;