import {Datastore, DatastoreRequest} from '@google-cloud/datastore';
import {ISchedule} from "../../types";
import { ADDRGETNETWORKPARAMS } from 'dns';

const add = async (datastore:Datastore,schedule: ISchedule,force:boolean = false) => {
    const key = {
        namespace:"scheduler",
        kind:"schedules",
        name:schedule.name
    }
    delete schedule.name;

    const insert = await datastore.insert({
        key,
        data:schedule
    })
}

export default add;
