import {VertretungsDaten} from "../../../source/src/app/Classes";
import {Creds} from "../Classes";

export function getVertretungsdaten(creds: Creds, useLehrer = false): Promise<VertretungsDaten> {
    if(useLehrer) return _getLehrerVertretungsDaten(creds.l);
    else return _getSchuelerVertretungsDaten(creds);
}


export function _getLehrerVertretungsDaten(creds: Creds): Promise<VertretungsDaten> {
    throw new Error("Not implemented function _getVertretungsDaten");
}

export function _getSchuelerVertretungsDaten(creds: Creds): Promise<VertretungsDaten> {
    throw new Error("Not implemented function _getVertretungsDaten");
}