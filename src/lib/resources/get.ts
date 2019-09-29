// start with vms
//@ts-ignore
import Compute from "@google-cloud/compute";
import {IResource} from "../../types";

const compute = new Compute();

// compute.getVMs().then((res:any) => {
//     res = res[0]
//     console.log(res[0])
// })

const get = async () : Promise<IResource[]>=> {
    const [vms] = await compute.getVMs();
    const scheduledVMs = vms.filter((vm:any) => {
        const labels = vm.metadata.labels;
        return Object.keys(labels || {}).includes("schedule")
    }).map((vm:any) => {

        let status = vm.metadata.status;
        if(status !== "RUNNING" || status !== "TERMINATED"){
            status = "IGNORE";
        }

        return {
            state:status,
            name:vm.name,
            type:"compute",
            schedule:vm.metadata.labels.schedule,
        }
    })
    return scheduledVMs;
}

export default get;