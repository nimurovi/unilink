export const WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export type RoutineInput={course:string;code:string;instructor:string;room:string;weekday:number;startTime:string;endTime:string;kind:string;notes:string};
export type RoutineEntry=RoutineInput&{id:string;version:number};
export function dhakaClock(now=Date.now()){const d=new Date(now+6*3600000);return {day:d.getUTCDay(),time:d.toISOString().slice(11,16),date:d.toISOString().slice(0,10)};}
export function formatRoutineTime(time:string){const [h,m]=time.split(':').map(Number);return `${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;}
