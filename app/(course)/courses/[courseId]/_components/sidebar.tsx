"use client";

import React from "react";
import { CourseSidebar } from "./course-sidebar";
import { useQuery } from "@tanstack/react-query";
import { fetchCourseById } from "@/apis/page";

const Sidebar = ({ courseId }: { courseId: string }) => {
  const { data: course, isLoading: courseLoading } = useQuery<any>({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId),
  });

  if (courseLoading) {
    return <div>...Loading</div>;
  }
  return (
    <>
      <CourseSidebar course={course} />
    </>
  );
};

export default Sidebar;
