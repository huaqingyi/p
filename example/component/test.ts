import { Component, PComponent, resource } from '../../src';
import { AppConfiguration } from '../configuration/app';

@Component
export class TestComponent extends PComponent {

    @resource
    public config!: AppConfiguration;

    public name: string;

    constructor() {
        super();
        this.name = 'test';
        console.log('config', this.config);
    }
}