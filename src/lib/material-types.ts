export const MATERIAL_TYPES = ["Lecture", "Slides", "Notes", "Lab", "Question Paper", "Other"] as const;
export type MatType = typeof MATERIAL_TYPES[number];
export type FileExt = "PDF" | "PPTX" | "PPT" | "DOCX" | "DOC" | "XLSX" | "ZIP" | "Image";
export type Material = {
 id:string; title:string; course:string; code:string; color:string; type:MatType;
 ext:FileExt; size:string; uploader:string; uploaderRole:"cr"|"admin"|"instructor";
 uploadedAgo:string; uploadedDate:string; createdAt:string; fileName:string;
 description?:string; archived?:boolean; version?:number; updated?:string;
};
