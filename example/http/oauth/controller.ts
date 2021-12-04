import { Controller, PController, RequestMapping, RequestMappingMethod } from '../../../src';

@Controller('/test')
export default class extends PController {

    @RequestMapping
    public test() {

    }

    @RequestMapping({ path: '/test1', methods: [RequestMappingMethod.GET] })
    public test1() {

    }
}