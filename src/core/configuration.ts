import { config } from 'dotenv';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { isNaN, map, merge } from 'lodash';
import { dirname, join } from 'path';

export type MPYIConfigurationType = string | number | boolean;
export type MPYIConfigurationAOType = { [key: string]: MPYIConfiguration | Array<MPYIConfiguration> | MPYIConfigurationAOType };
export type MPYIConfiguartionKeyed = string;

export interface MPYIConfiguration {
    [key: string]: MPYIConfigurationType | Array<MPYIConfiguration> | MPYIConfigurationAOType;
    APP_PATH: string;
    RUNTIME: string;
    DECLARATION: string;
    MODE: string;
}

export class APPConfiguration {
    public app: string;
    public runtime: string;
    public declaration: string;
    public mode: string;
    public _config: MPYIConfiguration;

    constructor() {
        this.app = dirname(process.argv[1]);
        this.runtime = join(this.app, '.runtime');
        if (!existsSync(this.runtime)) mkdirSync(this.runtime);
        this.declaration = join(this.app, 'types');
        if (!existsSync(this.declaration)) mkdirSync(this.declaration);

        this.mode = process.env.MODE || 'production';
        const defpath = join(this.app, '.env');
        const defig = existsSync(defpath) ? config({ path: defpath }).parsed : {};
        const mode = `.env.${this.mode}`;
        const conpath = join(this.app, mode);
        const conf = existsSync(conpath) ? config({ path: conpath }).parsed : {};
        this._config = merge(defig, conf, {
            APP_PATH: this.app,
            RUNTIME: this.runtime,
            DECLARATION: this.declaration,
            MODE: this.mode,
        });
    }

    public formatted() {
        const s = `    `;
        const configKeyeds: string[] = [];
        const configKeyed: string[] = map(this._config, (v, k) => {
            configKeyeds.push(`'${k}'`);
            switch (v) {
                // eslint-disable-next-line prettier/prettier
                case 'true': return `${s}${s}${k}: boolean;`;
                // eslint-disable-next-line prettier/prettier
                case 'false': return `${s}${s}${k}: boolean;`;
                // eslint-disable-next-line prettier/prettier
                default: break;
            }
            return `${s}${s}${k}: ${isNaN(Number(v)) ? 'string' : 'number'};`;
        });
        const configType: string[] = [`declare module 'pyi' {`, `${s}export interface MPYIConfiguration {`].concat(configKeyed).concat([`${s}}`]);
        configType.push(``);
        configType.push(`${s}export type MPYIConfiguartionKeyed = ${configKeyeds.join(' | ')} | string;`);
        configType.push(`}`);
        configType.push(``);
        writeFileSync(join(this.declaration, '_.configuration.d.ts'), configType.join('\n'));
        // console.log(1111111, this._config);
        return this;
    }

    public config(key?: MPYIConfiguartionKeyed) {
        if (key) return this._config[key];
        return this._config;
    }
}
