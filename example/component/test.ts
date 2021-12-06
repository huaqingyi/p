import { autowired, Component, PComponent, resource } from '../../src';
import { AppConfiguration } from '../configuration/app';
import { Test1Component } from './test1';

@Component
export class TestComponent extends PComponent {

    @autowired
    public test1!: Test1Component;

    @resource
    public config!: AppConfiguration;

    public name: string;

    constructor() {
        super();
        this.name = 'test';
        console.log('tc', this.test1);
        console.log('config', this.config);
    }
}