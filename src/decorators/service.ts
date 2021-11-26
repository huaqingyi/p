import { PCore, PYIClass } from '../core';

export function Service<P extends PService>(target: PYIClass<P> & ThisType<P>) {
    return target;
}

export class PService extends PCore {

}
