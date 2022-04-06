import { Component, PYIComponent } from '../../src';
import { DataSource } from 'typeorm';
import { DatabaseConfiguration } from '../configuration/database';

@Component
export class Database extends PYIComponent.mixin(DataSource) {
    constructor(private props: DatabaseConfiguration) {
        super(props);
    }

    public table() {
        return this;
    }
}
