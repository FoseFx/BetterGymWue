import {PersoPlan, userDBResult} from "./util";

export interface Payload extends userDBResult{
    plan?: PersoPlan;
}