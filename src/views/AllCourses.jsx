import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { firestore } from "../services/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(firestore, "courses");
      const coursesQuery = query(coursesCollection);
      const coursesSnapshot = await getDocs(coursesQuery);

      const courseData = [];
      coursesSnapshot.forEach((doc) => {
        const data = doc.data();
        courseData.push({
          id: doc.id,
          code: data["course-code"],
          name: data["name"],
          credits: data["credits"],
          rating: data["ratings"],
        });
      });

      return courseData;
    };

    const fetchRatings = async () => {
      const ratingsCollection = collection(firestore, "ratings");
      const ratingsQuery = query(ratingsCollection);
      const ratingsSnapshot = await getDocs(ratingsQuery);

      const ratingsData = [];
      ratingsSnapshot.forEach((doc) => {
        const data = doc.data();
        ratingsData.push({
          id: doc.id,
          code: data["course-code"],
          rating: data["avgRating"],
        });
      });

      return ratingsData;
    };

    const fetchData = async () => {
      const courses = await fetchCourses();
      const ratings = await fetchRatings();
      setCourses([...courses, ...ratings]);
    };

    fetchData();
  }, []);

  console.log(courses);

  const rows = courses.map((course, index) => ({
    id: index + 1,
    col1: course.code,
    col2: course.name,
    col3: course.credits,
    col4: course.rating,
  }));

  const columns = [
    { field: "col1", headerName: "Code", width: 150 },
    { field: "col2", headerName: "Name", width: 150 },
    { field: "col3", headerName: "Credits", width: 150 },
    { field: "col4", headerName: "Rating", width: 150 },
  ];

  return (
    <div style={{ background: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
      />
    </div>
  );
}
