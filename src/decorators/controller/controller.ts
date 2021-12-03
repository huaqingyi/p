import { PCore, PYIClass } from '../../core';
import { pyi } from '../application';

export interface ConfigurationController {

}

export function Controller<P extends PController>(target: PYIClass<P>);
export function Controller<P extends PController>(): <PYI extends PYIClass<P>>(target: PYI) => PYI {
    return function (target) {
        console.log(111, pyi.router, target);
        return target;
    }
}

export class PController extends PCore {

}

export function RequestMapping() {

}
