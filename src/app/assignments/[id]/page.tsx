import AssignmentsView from "../AssignmentsView";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <AssignmentsView key={id} initialId={id}/>;}
