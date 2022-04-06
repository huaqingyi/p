import { OnCatch, OnMount, OnUpdate, PYIApplication } from '../../src';

export class Application extends PYIApplication implements OnMount, OnUpdate, OnCatch {
    public constructor() {
        super();
    }

    public onMount() {
        console.log('onMount ...');
    }

    public onUpdate() {
        console.log('onUpdate ...');
    }

    public onCatch() {
        console.log('onCatch ...');
    }
}
