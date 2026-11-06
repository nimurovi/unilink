export const CLUB_CATEGORIES=['Academic','Technology','Cultural','Sports','Volunteering','Other'];
export type ClubInput={title:string;description:string;category:string;contact:string;meetingInfo:string;closed:boolean};
export type ClubEntry=ClubInput&{id:string;version:number;author:string;memberCount:number;joined:boolean};
