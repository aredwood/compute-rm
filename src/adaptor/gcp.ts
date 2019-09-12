import { IComputeAdaptor, IVM, VMStatus } from "../types";
//@ts-ignore
import Compute from "@google-cloud/compute";
const computeInstance = new Compute();

// custom stauts map to use 
const mapStatus = (status:string) : VMStatus => {
    // PROVISIONING, STAGING, RUNNING, STOPPING, STOPPED, SUSPENDING, SUSPENDED, and TERMINATED
    status = status.toUpperCase();

    if(["PROVISIONING","STAGING"].indexOf(status) !== -1){
        return VMStatus.STARTING;
    }

    if(status == "RUNNING"){
        return VMStatus.RUNNING
    }

    if(status == "STOPPING"){
        return VMStatus.STOPPING;
    }

    if(["STOPPED","TERMINATED"].indexOf(status) !== -1){
        return VMStatus.STOPPED
    }

    if(["SUSPENDING","SUSPENDED"].indexOf(status) !== -1){
        return VMStatus.ERROR;
    }

    return VMStatus.ERROR;
}

const gcp : IComputeAdaptor = {
    getVMs: async () => {

        const [vms] = await computeInstance.getVMs();

        const compliantVMs = vms.map((vm:any) => {
            // normalize status
            const status = mapStatus(vm.metadata.status);

            // normalize tags
            let tags = vm.metadata.labels || {};
            if(tags['rm-assertstate']){
                tags['rm-assertstate'] = mapStatus(tags['rm-assertstate'])
            }

            return {
                id:vm.metadata.id,
                name:vm.name,
                status,
                tags,
                metadata:{
                    handler:vm
                }
            }
        }) as IVM[];

        return compliantVMs;

    },
    stopVM: async (vm:IVM) => {
        try{
            await vm.metadata.handler.stop();
            return true;
        }
        catch(err){
            return false;
        }
    },
    startVM: async (vm:IVM) => {
        try{
            await vm.metadata.handler.start();
            return true;
        }
        catch(err){
            return false;
        }
    }
}

export default gcp;