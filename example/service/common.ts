import { PYIService, Service } from '../../src';

@Service
export class CommonService extends PYIService {
    public test() {
        return 'common service test ...';
    }
}
