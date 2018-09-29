import {dbResult} from "./util";
import {TempTT} from "../../source/src/app/Classes";

export interface Payload extends dbResult{
    stundenplan: TempTT;
}