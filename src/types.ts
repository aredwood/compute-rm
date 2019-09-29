type IScheduleType = "TIME" | "POINTS";
interface ISchedulePointSpecification{
    points:number
}
interface IScheduleTimeSpecification{
    startTime:number,
    endTime:number,
    timeZone:number
}
interface IScheduleBase{
    name:string,
    description:string
    type:IScheduleType,
    autoRestart:boolean
}
export interface ISchedulePoint extends IScheduleBase{
    specification:ISchedulePointSpecification
}
export interface IScheduleTime extends IScheduleBase{
    specification:IScheduleTimeSpecification
}
export type ISchedule = ISchedulePoint | IScheduleTime;

export interface IResource{
    type:"compute"
    name:string,
    schedule:string,
    state:string,
}