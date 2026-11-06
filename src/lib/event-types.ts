export const EVENT_CATEGORIES=['Workshop','Seminar','Competition','Career','Social','Other'];
export type EventInput={title:string;description:string;category:string;organizer:string;location:string;startsAt:string;endsAt:string;cancelled:boolean};
export type EventEntry=EventInput & {id:string;version:number;author:string;goingCount:number;myGoing:boolean|null};
export function eventStatus(e:EventInput,now=Date.now()){if(e.cancelled)return 'Cancelled';if(new Date(e.endsAt).getTime()<=now)return 'Completed';if(new Date(e.startsAt).getTime()<=now)return 'In progress';return 'Upcoming';}
export function eventDate(value:string){return new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',dateStyle:'medium',timeStyle:'short'}).format(new Date(value));}
export function eventLocal(value:string){return new Date(new Date(value).getTime()+6*60*60*1000).toISOString().slice(0,16);}
