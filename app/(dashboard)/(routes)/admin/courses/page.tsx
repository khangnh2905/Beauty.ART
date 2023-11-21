"use client";

import { redirect } from "next/navigation";


import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { fetchCourse } from "@/apis/page";

const CoursesPage = () => {
  const userId = "user_2YOlq7jGyQw7axdgRg1NKBFUgUb";

  const { data, isLoading } = useQuery<any>({
    queryKey: ["courses"],
    queryFn: fetchCourse,
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursesPage;
