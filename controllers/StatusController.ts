import { ControllerBase, HTTPVerbs as verbs, Use, Verb, Action, Route } from "web_api_base";

@Route("/status")
export default class StatusController extends ControllerBase
{
     
    constructor()
    {
        super();
    }

   
    @Verb(verbs.GET)
    @Action("/check")
    public CheckStatus() : void
    {
        this.OK({status : "OK"})
    }
    
}