// makes more sense for autocomplete
export enum VMStatus{
    STOPPING = "STOPPED",
    STARTING = "STARTING",
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    ERROR = "ERROR"
}

export interface IVMTags{
    "zrm-starttime":string,
    "zrm-stoptime":string,
    "zrm-enable":string,
    "zrm-assertstate":VMStatus.RUNNING | VMStatus.STOPPED
}

export interface IVM{
    id:string,
    name:string,
    status:VMStatus,
    tags:IVMTags,
    metadata?:any
}

export interface IComputeAdaptor{
    getVMs() : Promise<IVM[]>,
    stopVM(vm:IVM) : Promise<boolean>,
    startVM(vm:IVM): Promise<boolean>
}