export const NOTIFICATION_KINDS = ['announcements','class-updates','materials','assignments','routine','exams','events','opportunities','clubs'] as const;
export type NotificationEntry = {key:string;kind:string;title:string;body:string;version:number;time:string;unread:boolean};
export const NOTIFICATION_LABELS:Record<string,string> = {'announcements':'Announcements','class-updates':'Class updates','materials':'Materials','assignments':'Assignments','routine':'Routine','exams':'Exams','events':'Events','opportunities':'Opportunities','clubs':'Clubs'};
