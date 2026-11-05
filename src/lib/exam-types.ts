import {dhakaClock} from "./routine-types";
export const EXAM_KINDS=['Quiz','Class Test','Midterm','Final','Lab Exam','Practical','Viva','Presentation'];
export type ExamInput={title:string;course:string;code:string;instructor:string;room:string;examDate:string;startTime:string;endTime:string;kind:string;syllabus:string;instructions:string;cancelled:boolean};
export type ExamEntry=ExamInput&{id:string;version:number};
export function examStatus(e:ExamInput,now=Date.now()){
 if(e.cancelled)return 'Cancelled';const c=dhakaClock(now);
 if(e.examDate<c.date||(e.examDate===c.date&&e.endTime<=c.time))return 'Completed';
 if(e.examDate===c.date)return e.startTime<=c.time?'In progress':'Today';return 'Upcoming';
}
export function examDateLabel(date:string){return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Dhaka'}).format(new Date(date+'T00:00:00+06:00'));}
