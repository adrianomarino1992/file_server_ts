import { ControllerTest } from "../../classes/Controller";
import { ControllerBase, ControllersDecorators, IApplication, HTTPVerbs } from "web_api_base";

describe('testing controllers decorators', ()=>
{

    test("action name", ()=>
    {
        var controller = new ControllerTest();
        let action = ControllersDecorators.GetAction(controller, "TestAction");
        expect(action).toBe("Test");

    },10^5)

    test("http verb", ()=>
    {
        var controller = new ControllerTest();
        let verb = ControllersDecorators.GetVerb(controller, "TestAction");
        expect(verb).toBe(HTTPVerbs.GET);

    },10^5)
    


    test("controller route", ()=>
    {
        var controller = new ControllerTest();
        
        var route = ControllersDecorators.GetRoute(controller);
        
        expect(route!).toBe("/test");


    },10^5)

})