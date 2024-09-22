import { ControllerBase, Route, Inject, ActionResult, File, POST, GET  } from "web_api_base";
import FileServiceBase from "../services/fileService/FileServiceBase";
import Path from 'path';

import Formidable from "formidable";


@Route("/fs")
export default class FileController extends ControllerBase
{
    @Inject()
    private _fileService: FileServiceBase;

    constructor(fileService: FileServiceBase)
    {
        super();
        this._fileService = fileService;
    }


    @GET("/default-dir")    
    public async GetDefaultDir() : Promise<ActionResult>
    {
        return this.OK(await this._fileService.GetDefaultDir());
    }

    
    @GET("/files")
    public async GetAllFiles(folder : string) : Promise<ActionResult>
    {
        return this.OK(await this._fileService.GetAllFiles(folder))
    }


    
    @GET("/folders")
    public async GetAllFolders(folder : string) : Promise<ActionResult>
    {
        return this.OK(await this._fileService.GetAllForders(folder))
    }

    
    @GET("/download")
    public async DownloadFileAsync(file : string) : Promise<ActionResult>
    {
        if(!await this._fileService.FileExists(file))
            return this.BadRequest({error : `The file ${file} not exists`});
        
        return this.DownloadFile(file);
    }

    
    @POST("/upload")
    public async UploadFile(folder : string, file : File) : Promise<ActionResult>
    {
        if(!await this._fileService.DirectoryExists(folder))
            return this.Error({error : `The folder ${folder} not exists`});

        let newfile = Path.join(folder, file.FileName);
        
        await this._fileService.CopyAsync(file.Path, newfile);

        return this.OK({ created : true, message : `The file ${newfile} was uploaded`});    
    }



    @GET()
    public async CreateFolder(folder : string) : Promise<ActionResult>
    {
        await this._fileService.CreateDirectory(folder);

        return this.OK({ created : true, message : `The folder ${folder} was created`});
    }

    
}