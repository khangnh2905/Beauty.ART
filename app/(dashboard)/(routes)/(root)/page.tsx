"use client";

import { redirect, useRouter } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useQuery } from "@tanstack/react-query";
import { fetchCourse, fetchCoursesByUserID } from "@/apis/page";
import { User, useAuth } from "@/context/authContext";
import { isTeacher } from "@/lib/teacher";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();

  console.log(user?.id)
  if (!user?.id) {
    return (
      <div style={{ textAlign: 'center', margin: '150px auto', padding: '100px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Please log in to view the course</h2>
        <button style={{ padding: '12px', fontSize: '16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log In
        </button>
      </div>
    );
  }
  

  


  const { data, isLoading } = useQuery<any>({
    queryKey: ["coursesByUserId", user.id],
    queryFn: () => fetchCoursesByUserID(user.id),
  });

  const { data: courses, isLoading: coursesLoading } = useQuery<any>({
    queryKey: ["courses"],
    queryFn: fetchCourse
  })

  if (isLoading || coursesLoading) {
    return <div>...Loading</div>;
  }

  const teacher: any = isTeacher(user?.id)

  return (
    <>
      {teacher ? (
        <div className="space-x-4 p-6  space-y-4">

          <h4 className="p-4 text-2xl mb-4 font-bold bg-sky-100/20 underline">Danh sách khóa học của giảng viên</h4>

          <CoursesList
            items={courses}
          />
        </div>) :
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard icon={Clock} label="In Progress" numberOfItems={0} />
            <InfoCard
              icon={CheckCircle}
              label="Completed"
              numberOfItems={0}
              variant="success"
            />
          </div>
          <CoursesList
            items={data}
          />
        </div>}
    </>


  );
}
