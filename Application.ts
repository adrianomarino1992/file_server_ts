
import { Application, IApplicationConfiguration, DependecyService} from "web_api_base";


import FileServiceBase from "./services/fileService/FileServiceBase";
import FileService from "./services/fileService/FileService";
import { DocumentationDecorators } from "web_api_base/dist/decorators/documentation/DocumentationDecorators";



export default class App extends Application
{
    constructor()
    {
        super();
    }
    
    public override async ConfigureAsync(appConfig: IApplicationConfiguration): Promise<void>
    {     
       
        appConfig.Port = 5555;

        this.UseCors();

        await this.UseControllersAsync();

        appConfig.AddScoped(FileServiceBase, FileService);        

        if(appConfig.DEBUG)
            this.CreateDocumentation();

    }    
    
}