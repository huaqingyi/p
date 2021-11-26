import { config } from 'dotenv';
import { join } from 'path';

let midx = process.argv.indexOf('--mode');
midx = midx === -1 ? process.argv.indexOf('-m') : midx;
const env = midx === -1 ? '' : process.argv.slice(midx + 1, midx + 2).pop();

console.log(config({ path: join(process.cwd(), `.env${env ? `.${env}` : ''}`) }));
