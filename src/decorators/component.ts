import { PCore, PYIClass } from '../core';

export function Component<P extends PComponent>(target: PYIClass<P> & ThisType<P>) {
    return target;
}

export class PComponent extends PCore {

}
