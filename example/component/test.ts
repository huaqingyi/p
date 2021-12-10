import { autowired, Component, PComponent, resource } from '../../src';
import { AppConfiguration } from '../configuration/app';
import { Test1Component } from './test1';

@Component
export class TestComponent extends PComponent {

    @resource
    public config!: AppConfiguration;

    @autowired
    public test1!: Test1Component;

    public name: string;

    constructor() {
        super();
        this.name = 'test';
    }
}