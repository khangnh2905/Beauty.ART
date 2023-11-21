'use client'

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory, fetchCourse } from "@/apis/page";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage =  ({
  searchParams
}: SearchPageProps) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const categories = await db.category.findMany({
  //   orderBy: {
  //     name: "asc"
  //   }
  // });

  const { data: courses, isLoading: coursesLoading } = useQuery<any>({
    queryKey: ["courses"],
    queryFn: fetchCourse,
  });


  const {data: categories , isLoading: categoriesLoading} = useQuery<any>({
    queryKey: ["categories"],
    queryFn : fetchCategory,
  
  })

  if(coursesLoading || categoriesLoading){
    return <div>...Loading</div>
  }

  // const courses = await getCourses({
  //   userId,
  //   ...searchParams,
  // });

  console.log(courses)

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;