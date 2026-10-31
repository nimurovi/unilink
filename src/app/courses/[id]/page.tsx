"use client";
import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import { CourseDetail, COURSES } from "../CoursesView";
export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const course = COURSES.find(item => item.id.toLowerCase() === id.toLowerCase());
  if (!course) notFound();
  return <CourseDetail course={course} onBack={() => router.push("/courses")} />;
}
