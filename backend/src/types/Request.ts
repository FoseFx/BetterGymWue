import {Request} from "express";

export interface mRequest extends Request{
    gymWueUrl: string;
    credentials: string;
}