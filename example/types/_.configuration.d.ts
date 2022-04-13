declare module 'pyi' {
    export interface MPYIConfiguration {
        PROT: number;
        WORKER: number;
        APP_PATH: string;
        RUNTIME: string;
        DECLARATION: string;
        MODE: string;
        host: string;
        port: number;
        retryAttempts: number;
        retryDelay: number;
    }

    export type MPYIConfiguartionKeyed = 'PROT' | 'WORKER' | 'APP_PATH' | 'RUNTIME' | 'DECLARATION' | 'MODE' | 'host' | 'port' | 'retryAttempts' | 'retryDelay' | string;
}
