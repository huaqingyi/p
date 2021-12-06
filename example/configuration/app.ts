import { Configuration, PConfiguration, properties } from '../../src';

@Configuration
export class AppConfiguration extends PConfiguration {

    @properties('HOST')
    public host!: string;
}