import { PCore, PYIClass } from '../../core';

export function TCP<P extends TController>(target: PYIClass<P> & ThisType<P>) {
    return target;
}

export class TController extends PCore {

}
