import axios from "axios";

export async function fetchCourse(): Promise<any> {
  const res = await axios.get(`https://localhost:7129/Course/GetAllCourse`);
  return res.data;
}
export async function fetchCourseById(courseId: string): Promise<any> {
  const res = await axios.get(`https://localhost:7129/Course/GetCourseById?id=${courseId}`);
  return res.data;
}

export async function fetchCoursesByUserID(userId: string): Promise<any> {
  const res = await axios.get(`https://localhost:7129/Course/GetCourseByUserId?userId=${userId}`);
  return res.data;
}

export async function fetchCategory(): Promise<any> {
  const res = await axios.get(`https://localhost:7129/api/Category/GetCategories`);
  return res.data;
}

export async function fetchChapter(
  courseId: string,
  chapterId: string
): Promise<any> {
  const res = await axios.get(
    `https://localhost:7129/api/Chapter/GetAllChapters${chapterId}?courseId=${courseId}`
  );
  return res.data;
}
export async function fetchChapterById(
  chapterId: string
): Promise<any> {
  const res = await axios.get(
    `https://localhost:7129/api/Chapter?id=${chapterId}`
  );
  return res.data;
}

export async function fetchPurchase(userId: string, courseId: string) {
  try {
    const res = await axios.get(
      `https://localhost:7129/User/CheckUserBoughtCourse?userId=${userId}&courseId=${courseId}`
    );
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getAnalyticDashboard() : Promise<any> {
  try {
    const res = await axios.get(
      'https://localhost:7129/api/Payment/TotalSale'
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error)
  }

  
}
