'use client'

import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { useQuery } from "@tanstack/react-query";
import {
  fetchChapter,
  fetchChapterById,
  fetchCourseById,
  // fetchMuxVideoData,
  // fetchMuxVideoData,
  fetchPurchase,
} from "@/apis/page";
import { useAuth } from "@/context/authContext";
import { isTeacher } from "@/lib/teacher";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  // const { user?id } = auth();
  const { user } = useAuth();
  if (!user) {
    return null;
  }

  const { data: chapter, isLoading: chapterLoading } = useQuery<any>({
    queryKey: [
      "chapter",
      {
        chapterId: params.chapterId,
      },
    ],
    queryFn: () => fetchChapterById(params.chapterId),
  });

  const { data: course, isLoading: courseLoading } = useQuery<any>({
    queryKey: ["course", params.courseId],
    queryFn: () => fetchCourseById(params.courseId),
  });


  // done 
  const { data: purchase, isLoading: purchaseLoading } = useQuery<any>({
    queryKey: ["purchase", { userId: user.id, courseId: params.courseId }],
    queryFn: () => fetchPurchase(user.id, params.courseId),
  });


  if (chapterLoading || courseLoading || purchaseLoading) {
    return <div>...Loading</div>;
  }
  console.log(purchase)

  const teacher: any = isTeacher(user?.id)
  const isLocked = !purchase;

  console.log(teacher)
  return (
    <div>
      {teacher ? (<div>
        <div>
          {
            !teacher && (
              <Banner
                variant="warning"
                label="You need to purchase this course to watch this chapter."
              />
            )}
          <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div className="p-4">
              <VideoPlayer
                chapterId={params.chapterId}
                title={chapter.title}
                courseId={params.courseId}
                nextChapterId={chapter?.id}
                isLocked={!teacher}
              />
            </div>
            <div>
              <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
                {

                  teacher
                    ? (
                      <></>
                    ) : (
                      <CourseEnrollButton
                        courseId={params.courseId}
                        price={course.price!}
                        title={course.title}
                      />
                    )}
              </div>
              <Separator />
              <div>
                <Preview value={chapter.description!} />
              </div>

            </div>
          </div>
        </div>
      </div>) : (
        <div>
          <div>
            {
              isLocked && (
                <Banner
                  variant="warning"
                  label="You need to purchase this course to watch this chapter."
                />
              )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
              <div className="p-4">
                <VideoPlayer
                  chapterId={params.chapterId}
                  title={chapter.title}
                  courseId={params.courseId}
                  nextChapterId={chapter?.id}
                  isLocked={isLocked}
                />
              </div>
              <div>
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                  <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
                  {

                    !isLocked
                      ? (
                        <>Test buy</>
                      ) : (
                        <CourseEnrollButton
                          courseId={params.courseId}
                          price={course.price!}
                          title={course.title}
                        />
                      )}
                </div>
                <Separator />
                <div>
                  <Preview value={chapter.description!} />
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterIdPage;
