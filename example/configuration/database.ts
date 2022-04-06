import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Configuration, PYIConfiguration } from '../../src';
import { join } from 'path';

@Configuration
export class DatabaseConfiguration extends PYIConfiguration implements MysqlConnectionOptions {
    public type: 'mysql' | 'mariadb';
    public host: string;
    public port: number;
    public username: string;
    public password: string;
    public database: string;
    public synchronize: boolean;
    public logging: boolean;
    public entities: string[];
    public migrations: string[];
    public subscribers: string[];

    constructor() {
        super();
        this.type = 'mysql';
        this.host = 'localhost';
        this.port = 3306;
        this.username = 'mysql';
        this.password = 'mysql';
        this.database = 'mysql';
        this.synchronize = true;
        this.logging = true;
        this.entities = [join(__dirname, '../entities')];
        this.migrations = [join(__dirname, '../migrations')];
        this.subscribers = [join(__dirname, '../subscribers')];
    }
}
