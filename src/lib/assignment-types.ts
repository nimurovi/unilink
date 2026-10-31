export type AssignmentStatus = "upcoming" | "due-soon" | "submitted" | "overdue";
export type Assignment = {
 id:string;title:string;course:string;code:string;instructor:string;description:string;color:string;
 dueAt:string;createdAt:string;dueLabel:string;dueDate:string;dueTime:string;dueCalDate:string;
 status:AssignmentStatus;totalMarks:number;maxAttempts:number;allowLate:boolean;version:number;
 materialId:string|null;attempts:number;hasSubmission:boolean;
 submission:null|{fileName:string;submittedAt:string;note:string;isLate:boolean};
};
export type AssignmentInput = Pick<Assignment,"title"|"course"|"code"|"instructor"|"description"|"dueAt"|"totalMarks"|"maxAttempts"|"allowLate"|"materialId">;
export function assignmentStatus(dueAt:string,hasSubmission:boolean,now=Date.now()):AssignmentStatus {
 if(hasSubmission)return "submitted";const remaining=Date.parse(dueAt)-now;
 return remaining<=0?"overdue":remaining<=48*3600000?"due-soon":"upcoming";
}
export function dueText(iso:string){return new Date(iso).toLocaleString("en-GB",{timeZone:"Asia/Dhaka",dateStyle:"medium",timeStyle:"short"})+" (BD)";}
