import { autowired, Controller, PController, RequestMapping, RequestMappingMethod } from '../../../src';
import { TestComponent } from '../../component/test';

@Controller('/test', '/oauth')
export default class extends PController {

    @autowired
    public mtest!: TestComponent;

    @RequestMapping
    public test() {
        console.log(111, this.mtest);
        this.ctx.body = 'hello world ...';
    }

    @RequestMapping({ path: '/test1', methods: [RequestMappingMethod.GET] })
    public test1() {

    }
}