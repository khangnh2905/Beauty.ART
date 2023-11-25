'use client'

import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { useQuery } from "@tanstack/react-query";
import { fetchPurchase } from "@/apis/page";
import { useAuth } from "@/context/authContext";
import { isTeacher } from "@/lib/teacher";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
};


export const CourseSidebar = ({
  course,
}: CourseSidebarProps) => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }

  const { data: purchase, isLoading: purchaseLoading } = useQuery<any>({
    queryKey: ["purchase", { userId: user.id, courseId: course.id }],
    queryFn: () => fetchPurchase(user.id, course.id),
  });

  if (purchaseLoading) {
    return <div>...Loading</div>;
  }
  const teacher: any = isTeacher(user?.id)

  return (

    <div>
      {teacher ? (<div>
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
          <div className="p-8 flex flex-col border-b">
            <h1 className="font-semibold">
              {course.title}
            </h1>
            {teacher && (
              // <div className="mt-10">
              //   <CourseProgress
              //     variant="success"
              //     value={progressCount}
              //   />
              // </div>
              <></>
            )}
          </div>
          <div className="flex flex-col w-full">
            {course.chapters.map((chapter) => (
              <CourseSidebarItem
                key={chapter.id}
                id={chapter.id}
                label={chapter.title}
                isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                courseId={course.id}
                isLocked={!teacher}
              />
            ))}
          </div>
        </div>
      </div>) : (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
          <div className="p-8 flex flex-col border-b">
            <h1 className="font-semibold">
              {course.title}
            </h1>
            {purchase && (
              // <div className="mt-10">
              //   <CourseProgress
              //     variant="success"
              //     value={progressCount}
              //   />
              // </div>
              <></>
            )}
          </div>
          <div className="flex flex-col w-full">
            {course.chapters.map((chapter) => (
              <CourseSidebarItem
                key={chapter.id}
                id={chapter.id}
                label={chapter.title}
                isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                courseId={course.id}
                isLocked={!purchase}
              />
            ))}
          </div>
        </div>
      )}
    </div>


  )
}