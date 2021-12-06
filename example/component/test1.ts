import { Component, PComponent } from '../../src';

@Component
export class Test1Component extends PComponent {

    public name: string;

    constructor() {
        super();
        this.name = 'test1';
    }
}