
import  StatusController  from "./controllers/StatusController";
import  FileController  from "./controllers/FileController";

import { Application, IApplicationConfiguration, DependecyService} from "web_api_base";


import FileServiceBase from "./services/fileService/FileServiceBase";
import FileService from "./services/fileService/FileService";



export default class App extends Application
{
    constructor()
    {
        super();
    }
    
    public override async ConfigureAsync(appConfig: IApplicationConfiguration): Promise<void>
    {     
       
        this.UseCors();

        this.AddDependencyInjection(appConfig);       

        await this.UseControllers();

    }    

   
    private AddDependencyInjection(appConfig: IApplicationConfiguration) : void
    {
        DependecyService.RegisterFor(FileServiceBase, FileService);
        
        DependecyService.Register(FileController, ()=>
        {
            let fs = DependecyService.Resolve<FileServiceBase>(FileServiceBase);
            return new FileController(fs);
        });
       
    }

    
}