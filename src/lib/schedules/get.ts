
import {Datastore, DatastoreRequest} from '@google-cloud/datastore';
import {ISchedule} from "../../types";

const get = async (datastore:Datastore,name?:string) : Promise<ISchedule[]> => {
    let query = datastore.createQuery("scheduler","schedules");

    const [result] = await datastore.runQuery(query)

    const schedules = result.map(entity => {
        const name = entity[datastore.KEY]['name'];
        delete entity[datastore.KEY];
        entity.name = name;
        return entity
    })

    if(name){
        return schedules.filter((schedule) => {
            return schedule.name === name;
        }) as ISchedule[];
    }
    else{
        return schedules as ISchedule[]
    }
}

export default get;