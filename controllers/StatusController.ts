import { ControllerBase, Route, ActionResult, GET } from "web_api_base";

@Route("/status")
export default class StatusController extends ControllerBase
{
    
    @GET("/check")
    public CheckStatus() : ActionResult
    {
        return this.OK({status : "OK"})
    }
    
}