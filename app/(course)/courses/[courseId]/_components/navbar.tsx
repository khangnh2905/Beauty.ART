"use client";

import React from "react";
import { CourseNavbar } from "./course-navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchCourseById } from "@/apis/page";

const Navbar = ({ courseId }: { courseId: string }) => {
  const { data: course, isLoading: courseLoading } = useQuery<any>({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId),
  });

  if (courseLoading) {
    return <div>...Loading</div>;
  }
  return (
    <>
      <CourseNavbar course={course} />
    </>
  );
};

export default Navbar;
