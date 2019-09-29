import {Datastore} from '@google-cloud/datastore';
import {ISchedule} from "../../types";

const update = async (datastore:Datastore,schedule: ISchedule) => {
    const key = {
        namespace:"scheduler",
        kind:"schedules",
        name:schedule.name
    }
    delete schedule.name;

    await datastore.save({
        key,
        data:schedule
    })
}

export default update;
