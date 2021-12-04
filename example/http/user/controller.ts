import { Controller, PController, RequestMapping, RequestMappingMethod } from '../../../src';

@Controller
export default class extends PController {

    @RequestMapping
    public test() {
        
    }

    @RequestMapping({ path: '/test1', methods: [RequestMappingMethod.GET] })
    public test1() {

    }
}