declare interface UserDotENV {
	RUNTIME: string;
	TYPES: string;
	APP_PATH: string;
	HOST: string;
	PORT: number;
	DATABASE_HOST: string;
	DATABASE_USER: string;
	DATABASE_PASSWORD: number;
}
export type UserDotENVKey = 'RUNTIME' | 'TYPES' | 'APP_PATH' | 'HOST' | 'PORT' | 'DATABASE_HOST' | 'DATABASE_USER' | 'DATABASE_PASSWORD'