import { ControllerBase, HTTPVerbs as verbs,  Verb, Action, Route, Inject, ActionResult, File  } from "web_api_base";
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

    @Action("/default-dir")    
    public async GetDefaultDir() : Promise<ActionResult>

    {
        try{

            return this.OK(await this._fileService.GetDefaultDir())

        }
        catch(err)
        {
            return this.Error({error : (err as Error).message});
            
        }
    }
    
    @Action("/files")
    public async GetAllFiles(folder : string) : Promise<ActionResult>

    {
        try{

            return this.OK(await this._fileService.GetAllFiles(folder))

        }
        catch(err)
        {
            return this.Error({error : (err as Error).message});
            
        }
    }
    
    @Action("/folders")
    public async GetAllFolders(folder : string) : Promise<ActionResult>

    {
        try{
            
            return this.OK(await this._fileService.GetAllForders(folder))

        }
        catch(err)
        {
            return this.Error({error : (err as Error).message});
            
        }
    }

    
    @Action("/download")
    public async DownloadFileAsync(file : string) : Promise<ActionResult>

    {
        try{

            if(!await this._fileService.FileExists(file))
                return this.BadRequest({error : `The file ${file} not exists`});
            
            return this.DownloadFile(file);

        }
        catch(err)
        {
           return this.Error({error : (err as Error).message});
            
        }
    }

    @Verb(verbs.POST)
    @Action("/upload")
    public async UploadFile(folder : string, file : File) : Promise<ActionResult>
    {
        if(!await this._fileService.DirectoryExists(folder))
            return this.Error({error : `The folder ${folder} not exists`});

        let newfile = Path.join(folder, file.FileName);
        
        await this._fileService.CopyAsync(file.Path, newfile);

        return this.OK({ created : true, message : `The file ${newfile} was uploaded`});    
    }
    
    public async CreateFolder(folder : string) : Promise<ActionResult>

    {
        try{

            await this._fileService.CreateDirectory(folder);

            return this.OK({ created : true, message : `The folder ${folder} was created`});

        }
        catch(err)
        {
            return this.Error({error : (err as Error).message});
            
        }
    }

    
}