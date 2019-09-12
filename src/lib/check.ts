// this file checks to see if the VM should be operating, and will take action if needed.



import adaptor from "../adaptor";
import { VMStatus } from "../types";


const check = async () => {
    const vms = await adaptor.getVMs();

    // filter out all non-managed vms
    const taggedVMS = vms.filter((vm) => {
        if(Object.keys(vm.tags).indexOf("zrm-enable") !== -1){
            return vm.tags["zrm-enable"].toLowerCase() === "true";
        }
        else{
            return false;
        }
    });

    // check assertions
    let assertOperations : Promise<boolean>[] = [];
    taggedVMS.forEach(vm => {
        if(vm.status === VMStatus.STOPPED && vm.tags["zrm-assertstate"] === "RUNNING"){
            console.log(`${vm.name} has an assertion tag for it to start, starting this vm`);
            assertOperations.push(adaptor.startVM(vm));
        }

        if(vm.status === VMStatus.RUNNING && vm.tags['zrm-assertstate'] === "STOPPED"){
            console.log(`${vm.name} has an assertion tag for it to be stopped, stopping this vm`);
            assertOperations.push(adaptor.stopVM(vm));
        }
    });

    await Promise.all(assertOperations);


}


check();
