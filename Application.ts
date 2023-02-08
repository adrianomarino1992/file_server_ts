import { Express, Request, Response } from "express";
import ExpressModule from "express";
import ApplicationConfiguration from "./ApplicationConfiguration"
import IApplication from "./interfaces/IApplication";
import IApplicationConfiguration from "./interfaces/IApplicationConfiguration";
import { StatusController } from "./controllers/StatusController";
import { FileController } from "./controllers/FileController";
import DependecyService from "./dependencyInjection/DependecyService";
import { ControllerBase } from "./controllers/base/ControllerBase";
import FileServiceBase from "./services/fileService/FileServiceBase";
import FileService from "./services/fileService/FileService";
export default class Application implements IApplication
{

    private ApplicationConfiguration : IApplicationConfiguration;

    public Express : Express;


    constructor()
    {
        this.ApplicationConfiguration = new ApplicationConfiguration();

        this.Express = ExpressModule();

    }
    

    public async StartAsync() : Promise<void>
    {
        await this.ApplicationConfiguration.StartAsync();

        this.Configure();

        this.Express.listen(this.ApplicationConfiguration.Port, this.ApplicationConfiguration.Host, ()=>
        {
            console.log(`App running on ${this.ApplicationConfiguration.Host}:${this.ApplicationConfiguration.Port}`);
        })
    }

    public Configure(): void {

        this.Express.use(ExpressModule.json({limit : 50 * 1024 * 1024}));    
        
        this.Express.use(require('cors')());

        DependecyService.RegisterFor(FileServiceBase, FileService);

        DependecyService.Register(StatusController, ()=>
        {
            let fs = DependecyService.Resolve<FileServiceBase>(FileServiceBase);
            return new StatusController(fs);
        })

        DependecyService.Register(FileController, ()=>
        {
            let fs = DependecyService.Resolve<FileServiceBase>(FileServiceBase);
            return new FileController(fs);
        })

        ControllerBase.AppendController(StatusController,this); 
        ControllerBase.AppendController(FileController,this); 

    }
    
    
}