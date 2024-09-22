import { ControllerBase, ControllersDecorators, IApplication, HTTPVerbs } from "web_api_base";

import {Request, Response} from 'express'

@ControllersDecorators.Route("/test")
export class ControllerTest extends ControllerBase
{
    constructor()
    {
        super();
    }

    @ControllersDecorators.Action("Test")
    @ControllersDecorators.Verb(HTTPVerbs.GET)
    public TestAction(name : string)
    {
        console.log(name);
    }

    @ControllersDecorators.Action("Test")
    @ControllersDecorators.Verb(HTTPVerbs.GET)
    public TestActionTwo(name : string, age : number)
    {
        console.log(name, age);
    }


    public AppendSync(application: IApplication): void 
    {
        
    }
}