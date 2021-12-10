import { Context } from 'koa';
import { autowired, Controller, PController, RequestMapping, RequestMappingMethod } from '../../../src';
import { TestComponent } from '../../component/test';

@Controller('/test', '/oauth')
export default class extends PController {

    @autowired
    public mtest!: TestComponent;

    constructor(context: Context) {
        super(context);
    }
    
    @RequestMapping({ path: '/:id' })
    public test() {
        // console.log(this.ctx.get());
        // console.log(this.ctx.param());
        // console.log(this.ctx.post());
        this.ctx.body = 'hello world ...';
    }

    @RequestMapping({ path: '/test1', methods: [RequestMappingMethod.GET] })
    public async test1() {
        return 'test 1 ...';
    }
}