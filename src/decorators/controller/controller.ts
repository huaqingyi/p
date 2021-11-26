import { PCore, PYIClass } from '../../core';

// export function Controller<P extends PController>(
//     target: PYIClass<P> & ThisType<P>
// ): <PYI extends PYIClass<P>>(target: PYI) => PYI {

export function Controller<P extends PController>(): <PYI extends PYIClass<P>>(target: PYI) => PYI {
    return function (target) {
        return target;
    }
}

export class PController extends PCore {

}
