import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // const { userId } = auth();
  const userId = "user_2YOlq7jGyQw7axdgRg1NKBFUgUb";
  if (!isTeacher(userId)) {
    return redirect("/");
  }

  return <>{children}</>
}
 
export default TeacherLayout;