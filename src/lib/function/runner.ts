import {Datastore} from "@google-cloud/datastore";
import getSchedules from "../schedules/get";
import getResources from "../resources/get";
import updateSchedule from "../schedules/update";
import stopResource from "../resources/stop";
import startResource from "../resources/start"
import {ISchedulePoint, IScheduleTime} from "../../types";
const datastore = new Datastore();
const runner = async () => {
    const schedules = await getSchedules(datastore);
    const resources = await getResources();

    let operations : Promise<any>[] = [];

    // loop through each resource
    resources.forEach(resource => {
        // try to find its schedule
        let schedule = schedules.find(schedule => {
            return schedule.name === resource.schedule;
        });

        if(typeof schedule === "undefined"){
            return;
        }


        if(schedule.type === "POINTS"){

            schedule = schedule as ISchedulePoint;
            schedule.specification.points--;
            if(schedule.specification.points < 0){
                schedule.specification.points = 0;
            }

            operations.push(updateSchedule(datastore,schedule));

            if(schedule.specification.points > 0){
                console.log("resource should be running");

                if(schedule.autoRestart){
                    operations.push(startResource(resource));
                }
                
            }
            else{
                operations.push(stopResource(resource))
            }

            console.log(schedule)
        }

        if(schedule.type === "TIME"){
            schedule = schedule as IScheduleTime;
        }

    });

    await Promise.all(operations);


}

runner();


export default runner;