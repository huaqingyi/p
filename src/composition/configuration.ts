import { PYI, PYIConstructor } from '../core/pyi';
import { MPYIConfiguration, MPYIConfiguartionKeyed } from '../core/configuration';
import { isString, map, merge } from 'lodash';

export class CompositionConfiguration {
    public static instance: CompositionConfiguration;
    public static _config: MPYIConfiguration;
    public static mcompositions: Map<PYIConstructor<PYI>, PYIConstructor<PYI>[]>;

    public static create(config: MPYIConfiguration, mcompositions: Map<PYIConstructor<PYI>, PYIConstructor<PYI>[]>) {
        if (CompositionConfiguration.instance) return CompositionConfiguration.instance;
        CompositionConfiguration._config = config;
        CompositionConfiguration.mcompositions = mcompositions;
        CompositionConfiguration.instance = new CompositionConfiguration();
        return CompositionConfiguration.instance;
    }

    public static config(key?: MPYIConfiguartionKeyed | PYIConstructor<PYI>) {
        if (key && isString(key)) return CompositionConfiguration._config[key];
        if (key && (key as any)._root()) {
            const P = key as PYIConstructor<PYI>;
            const cs: PYIConstructor<PYI>[] = CompositionConfiguration.mcompositions.get(P) || [];
            if (cs && cs.length !== 0) return merge({}, ...map(cs, C => new C()));
            else return new P();
        }
        return CompositionConfiguration._config;
    }

    public get _config() {
        return CompositionConfiguration._config;
    }

    public get config() {
        return CompositionConfiguration.config;
    }
}

export const config = CompositionConfiguration.config;
