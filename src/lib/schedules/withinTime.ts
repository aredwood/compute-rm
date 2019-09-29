

const withinTime = (currentTime:Date,startTime:string,endTime:string) => {
    const [startHour,startMinute] = startTime.split(":").map(int => {
        return parseInt(int);
    })

    const [endHour,endMinute] = endTime.split(":").map(int => {
        return parseInt(int);
    })

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const afterStart = (() => {
        if(currentHour > startHour){
            return true;
        }
        else if(currentHour === startHour){
            if(currentMinute > startMinute){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    })();

    const beforeEnd = (() => {
        if(currentHour < endHour){
            return true;
        }
        else if(currentHour === startHour){
            if(currentMinute < startMinute){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    })();
    
    return afterStart && beforeEnd;
}


export default withinTime;

