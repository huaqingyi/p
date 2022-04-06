import { autowired, Controller, PYIController, RequestMapping, RequestMethods } from '../../../src';
import { Database } from '../../component/database';

@Controller
export default class extends PYIController {
    @autowired
    public database!: Database;

    @RequestMapping
    public async index() {
        return 'index ...';
    }

    @RequestMapping({ path: ['test', 'tested'], methods: [RequestMethods.GET] })
    public async test() {
        return 'test, tested ...';
    }
}
