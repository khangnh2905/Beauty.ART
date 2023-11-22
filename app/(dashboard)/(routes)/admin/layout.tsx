'use client'

import { useAuth } from "@/context/authContext";
import { isTeacher } from "@/lib/teacher";
import { redirect } from "next/navigation";

const TeacherLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {user} = useAuth()

  if (!isTeacher(user?.id)) {
    return redirect("/");
  }

  return <>{children}</>
}
 
export default TeacherLayout;