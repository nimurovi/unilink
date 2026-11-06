export const OPPORTUNITY_CATEGORIES = ['Internship','Job','Scholarship','Competition','Workshop','Research','Other'];
export type OpportunityInput = {title:string;description:string;category:string;organization:string;location:string;applicationUrl:string;deadline:string;closed:boolean};
export type OpportunityEntry = OpportunityInput & {id:string;version:number;author:string;createdAt:string;updatedAt:string};
export function opportunityStatus(entry:OpportunityInput,now:number){
 if(entry.closed)return 'Closed';
 if(entry.deadline && now >= new Date(entry.deadline+'T00:00:00+06:00').getTime()+86400000)return 'Expired';
 return 'Open';
}
