// start with vms
//@ts-ignore
import Compute from "@google-cloud/compute";
import {IResource} from "../../types";

const compute = new Compute();

const start = async (resource:IResource) : Promise<any>=> {
    const [vms] = await compute.getVMs();
    const thisVM = vms.find((vm:any) => {
        return resource.name === vm.name;
    });

    await thisVM.start();

}

export default start;