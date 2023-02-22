import { ControllerBase, HTTPVerbs as verbs, Use, Verb, Action, Route } from "web_api_base";

import FileServiceBase from "../services/fileService/FileServiceBase";


@Route("/status")
export default class StatusController extends ControllerBase
{
     
    constructor(public FileService : FileServiceBase)
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