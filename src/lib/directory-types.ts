export type DirectoryMember = {
  id: number;
  fullName: string;
  studentId: string;
  role: 'student' | 'cr';
  isYou: boolean;
};
export type ClassDirectory = {
  department: string;
  batch: string;
  section: string;
  members: DirectoryMember[];
};
