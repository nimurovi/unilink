export const ANNOUNCEMENT_CATEGORIES=['Academic','Schedule','Exam','Important','General'];
export type AnnouncementInput={title:string;message:string;category:string;pinned:boolean};
export type AnnouncementEntry=AnnouncementInput&{id:string;version:number;author:string;createdAt:string;updatedAt:string};
export function announcementDate(date:string){return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',timeZone:'Asia/Dhaka'}).format(new Date(date));}
