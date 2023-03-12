import { ControllerBase, HTTPVerbs as verbs,  Use, Verb, Action, Route, Argument, Inject  } from "web_api_base";
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
    public async GetDefaultDir() : Promise<void>
    {
        try{

            this.OK(await this._fileService.GetDefaultDir())

        }
        catch(err)
        {
            this.Error({error : (err as Error).message});
            
        }
    }
    
    @Action("/files")
    @Argument<string>("folder")
    public async GetAllFiles(folder : string) : Promise<void>
    {
        try{

            this.OK(await this._fileService.GetAllFiles(folder))

        }
        catch(err)
        {
            this.Error({error : (err as Error).message});
            
        }
    }
    
    @Action("/folders")
    @Argument<string>("folder")
    public async GetAllFolders(folder : string) : Promise<void>
    {
        try{
            
            this.OK(await this._fileService.GetAllForders(folder))

        }
        catch(err)
        {
            this.Error({error : (err as Error).message});
            
        }
    }

    
    @Action("/download")
    @Argument<string>("file")
    public async DownloadFile(file : string) : Promise<void>
    {
        try{

            if(!await this._fileService.FileExists(file))
                return this.BadRequest({error : `The file ${file} not exists`});
            
            this.Response.download(file);

        }
        catch(err)
        {
            this.Error({error : (err as Error).message});
            
        }
    }

    @Verb(verbs.POST)
    @Action("/upload")
    @Argument<string, string>("folder", "filename")
    public async UploadFile(folder : string, filename : string) : Promise<void>
    {
        if(!filename)
            return this.Error({error : `The file´s name is required`});

        if(!await this._fileService.DirectoryExists(folder))
            return this.Error({error : `The folder ${folder} not exists`});

        try{

            Formidable({multiples : false}).parse(this.Request, async (err, _, incomming) => 
            {
                if(err)
                    return this.Error(err);

                try{

                    let temp = (incomming.file as Formidable.File).filepath;
                    
                    let newfile = Path.join(folder, filename);
                    
                    await this._fileService.CopyAsync(temp, newfile);

                    this.OK({ created : true, message : `The file ${newfile} was uploaded`});

                }
                catch(err)
                {
                    this.Error({error : (err as Error).message});
                    
                }
               
            });
            

        }
        catch(err)
        {
            this.Error({error : (err as Error).message});
            
        }
    }
    
    @Argument<string>("folder")
    public async CreateFolder(folder : string) : Promise<void>
    {
        try{

            await this._fileService.CreateDirectory(folder);

            this.OK({ created : true, message : `The folder ${folder} was created`});

        }
        catch(err)
        {
            this.Error({error : (err as Error).message});
            
        }
    }

    
}