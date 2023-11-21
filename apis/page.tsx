import axios from "axios";



export async function fetchCourse(): Promise<any> {
    const res = await axios.get(`http://localhost:3001/courses`);
    return res.data;
}