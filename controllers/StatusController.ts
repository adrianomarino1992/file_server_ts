import CD from "../decorators/controllers/ControllerDecorators";
import { ControllerBase } from "./base/ControllerBase";
import { HTTPVerbs as verbs } from "../enums/httpVerbs/HttpVerbs";
import FileServiceBase from "../services/fileService/FileServiceBase";


@CD.Use(s => { console.log("primeiro midleware a ser executado")})
@CD.Use(s => { console.log("segundo midleware a ser executado")})
@CD.Route("/status")
export class StatusController extends ControllerBase
{
     
    constructor(public FileService : FileServiceBase)
    {
        super();
    }

    @CD.Before(s => console.log("midleware executado apenas para essa action"))
    @CD.Verb(verbs.GET)
    @CD.Action("/check")
    public CheckStatus() : void
    {
        this.OK({status : "OK"})
    }
    
}