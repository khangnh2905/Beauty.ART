'use client'

import { auth } from "@clerk/nextjs";
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
  fetchCourseById,
  fetchMuxVideoData,
  fetchPurchase,
} from "@/apis/page";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  // const { userId } = auth();
  const userId = "user_2YOlq7jGyQw7axdgRg1NKBFUgUb";
  // if (!userId) {
  //   return redirect("/");
  // }

  // const {
  //   chapter,
  //   course,
  //   muxData,
  //   attachments,
  //   nextChapter,
  //   purchase,
  // } = await getChapter({
  //   userId,
  //   chapterId: params.chapterId,
  //   courseId: params.courseId,
  // });

  // if (!chapter || !course) {
  //   return redirect("/")
  // }

  const { data: chapter, isLoading: chapterLoading } = useQuery<any>({
    queryKey: [
      "chapter",
      {
        courseId: params.courseId,
        chapterId: params.chapterId,
      },
    ],
    queryFn: () => fetchChapter(params.courseId, params.chapterId),
  });

  const { data: course, isLoading: courseLoading } = useQuery<any>({
    queryKey: ["course", params.courseId],
    queryFn: () => fetchCourseById(params.courseId),
  });

  const { data: muxData, isLoading: muxLoading } = useQuery<any>({
    queryKey: ["mux", params.chapterId],
    queryFn: () => fetchMuxVideoData(params.chapterId),
  });
  const { data: purchase, isLoading: purchaseLoading } = useQuery<any>({
    queryKey: ["purchase", { userId: userId, courseId: params.courseId }],
    queryFn: () => fetchPurchase(userId, params.chapterId),
  });

  if (chapterLoading || courseLoading || muxLoading || purchaseLoading) {
    return <div>...Loading</div>;
  }
console.log(purchase)
  const isLocked = !chapter.isFree 
  // && !purchase
  ;
  console.log(isLocked)

  return (
    <div>
      {isLocked && (
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
            // nextChapterId={nextChapter?.id}
            nextChapterId={chapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {!!purchase.courseId ? (
              // <CourseProgressButton
              //   chapterId={params.chapterId}
              //   courseId={params.courseId}
              //   nextChapterId={nextChapter?.id}
              // />
              <></>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
                title= {course.title}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {/* {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
