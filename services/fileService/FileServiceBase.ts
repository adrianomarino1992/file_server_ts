import { IDirectory } from "../../interfaces/entities/IDirectory";

export default abstract class FileServiceBase 
{
    constructor(){}

    public abstract CopyAsync(origin: string, dest: string): Promise<void>;
    public abstract GetAllFiles(origin: string): Promise<string[]>;
    public abstract GetAllForders(origin: string): Promise<string[]>;
    public abstract FileExists(file: string): Promise<boolean>;
    public abstract DirectoryExists(path: string): Promise<boolean>;
    public abstract CreateDirectory(path: string): Promise<void>;
    public abstract GetDefaultDir(): string;
   
}

