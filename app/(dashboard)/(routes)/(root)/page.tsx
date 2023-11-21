"use client";

import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useQuery } from "@tanstack/react-query";
import { fetchCourse } from "@/apis/page";

export default function Dashboard() {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const {
  //   completedCourses,
  //   coursesInProgress
  // } = await getDashboardCourses(userId);

  const { data, isLoading } = useQuery<any>({
    queryKey: ["courses"],
    queryFn: fetchCourse,
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
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
        // items={[...coursesInProgress, ...completedCourses]}
        items={data}
      />
    </div>
  );
}
