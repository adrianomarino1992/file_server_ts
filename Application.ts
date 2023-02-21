
import { StatusController } from "./controllers/StatusController";
import { FileController } from "./controllers/FileController";

import { ControllerBase, Application, IApplicationConfiguration, DependecyService } from "web_api_base";

import FileServiceBase from "./services/fileService/FileServiceBase";
import FileService from "./services/fileService/FileService";

export default class App extends Application
{
    constructor()
    {
        super();
    }
    
    public override Configure(appConfig: IApplicationConfiguration): void
    {      
        appConfig.Host = "0.0.0.0";
        
        appConfig.Port = 5555;  
       
        this.UseCors();

        this.AddDependencyInjection(appConfig);       

    }    
    
    private AddDependencyInjection(appConfig: IApplicationConfiguration) : void
    {
        DependecyService.RegisterFor(FileServiceBase, FileService);

        DependecyService.Register(StatusController, ()=>
        {
            let fs = DependecyService.Resolve<FileServiceBase>(FileServiceBase);
            return new StatusController(fs);
        });       

        DependecyService.Register(FileController, ()=>
        {
            let fs = DependecyService.Resolve<FileServiceBase>(FileServiceBase);
            return new FileController(fs);
        })

        ControllerBase.AppendController(StatusController,this); 

        ControllerBase.AppendController(FileController,this); 
    }
    
}