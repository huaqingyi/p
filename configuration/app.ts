import { Configuration, PYIConfiguration, property } from '../src';

@Configuration
export class AppConfiguration extends PYIConfiguration {

    @properties('HOST')
    public host!: string;
}