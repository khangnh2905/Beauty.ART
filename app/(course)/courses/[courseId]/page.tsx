'use client'

import { fetchCourseById } from "@/apis/page";
import { useAuth } from "@/context/authContext";
import { isTeacher } from "@/lib/teacher";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {


  const { data: course, isLoading: courseLoading } = useQuery<any>({
    queryKey: ["course", params.courseId],
    queryFn: () => fetchCourseById(params.courseId),
  });
  // const course = await db.course.findUnique({
  //   where: {
  //     id: params.courseId,
  //   },
  //   include: {
  //     chapters: {
  //       where: {
  //         isPublished: true,
  //       },
  //       orderBy: {
  //         position: "asc"
  //       }
  //     }
  //   }
  // });

  if (courseLoading) {
    return <div>...loaidng</div>
  }

  if (!course) {
    return redirect("/"); 
  }



  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

// /chapters/${course.chapters[0].id}
export default CourseIdPage;
