
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const CourseLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const course = await db.course.findUnique({
  //   where: {
  //     id: params.courseId,
  //   },
  //   include: {
  //     chapters: {
  //       where: {
  //         isPublished: true,
  //       },
  //       include: {
  //         userProgress: {
  //           where: {
  //             userId,
  //           },
  //         },
  //       },
  //       orderBy: {
  //         position: "asc",
  //       },
  //     },
  //   },
  // });

  // const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        
        <Navbar courseId={params.courseId}/>
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">

        <Sidebar courseId={params.courseId}/>
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
