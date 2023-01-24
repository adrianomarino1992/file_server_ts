import { Express } from "express";

import IController from "./IController";

export default interface IApplication
{
    Express : Express;

    StartAsync() : Promise<void>;    

    Configure(): void;
}