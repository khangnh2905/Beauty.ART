import axios from "axios";

export async function fetchCourse(): Promise<any> {
  const res = await axios.get(`http://localhost:3001/courses`);
  return res.data;
}
export async function fetchCourseById(courseId: string): Promise<any> {
  const res = await axios.get(`http://localhost:3001/courses/${courseId}`);
  return res.data;
}

export async function fetchCategory(): Promise<any> {
  const res = await axios.get(`http://localhost:3001/categories`);
  return res.data;
}

export async function fetchChapter(
  courseId: string,
  chapterId: string
): Promise<any> {
  const res = await axios.get(
    `http://localhost:3001/chapters/${chapterId}?courseId=${courseId}`
  );
  return res.data;
}

export async function fetchMuxVideoData(chapterId: string) {
  const res = await axios.get(
    `http://localhost:3001/muxData?chapterId=${chapterId}`
  );
  return res.data;
}
export async function fetchPurchase(userId: string, courseId: string) {
  const res = await axios.get(
    `http://localhost:3001/purchase?userId=${userId}&courseId=${courseId}`
  );
  return res.data;
}
