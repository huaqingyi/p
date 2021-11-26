import { PService, Service } from '../src';

@Service
export class TestService extends PService {

    public async test() {
        return 'common service ...';
    }
}