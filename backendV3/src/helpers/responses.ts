import { Response } from "express";

export function ErrorMessage(res: Response, message: String, code = 500){
    return res.status(code).json({error: true, errorMessage: message}).end();
};

export function NormalResponse(res: Response, obj: Object, code = 200){
    // @ts-ignore
    obj["error"] = false;
    return res.status(code).json(obj).end();
};

