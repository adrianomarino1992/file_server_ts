import { ControllerBase, HTTPVerbs as verbs, Verb, Action, Route, ActionResult } from "web_api_base";

@Route("/status")
export default class StatusController extends ControllerBase
{
     
    constructor()
    {
        super();
    }

   
    @Verb(verbs.GET)
    @Action("/check")
    public CheckStatus() : ActionResult
    {
        return this.OK({status : "OK"})
    }
    
}