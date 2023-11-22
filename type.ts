export type CourseFormType = {
    courseId: string;
    courseDescription: string;
    title: string;
    categoryId: string;
    imageUrl: string;
    price: number;
    chapters: ChapterFormType[]
}

export type ChapterFormType = {
    id: string,
    title: string;
    description: string;
    videoUrl: string;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;

}