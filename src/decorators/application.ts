import { existsSync, mkdirpSync } from 'fs-extra';
import { join } from 'path';
import { env } from '../composition';
import { PCore, PYIClass } from '../core';

export function PYIBootstrap<P extends PYIApplcation>(target: PYIClass<P> & ThisType<P>) {
    // const runtime = join(process.cwd(), 'runtime');
    // if (!existsSync(runtime)) mkdirpSync(runtime);
    const config = env();
    return target;
}

export class PYIApplcation extends PCore {

}