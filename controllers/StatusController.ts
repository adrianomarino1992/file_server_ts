import CD from "../decorators/controllers/ControllerDecorators";
import { ControllerBase } from "./base/ControllerBase";
import DependecyService from "../dependencyInjection/DependecyService";
import { HTTPVerbs as verbs } from "../enums/httpVerbs/HttpVerbs";
import FileServiceBase from "../services/fileService/FileServiceBase";


@CD.Route("/status")
export class StatusController extends ControllerBase
{
     
    constructor(public FileService : FileServiceBase)
    {
        super();
    }

    @CD.Verb(verbs.GET)
    @CD.Action("/check")
    public CheckStatus() : void
    {
        this.OK({status : "OK"})
    }
    
}