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
          // Add other fields if needed
        });
      });

      setCourses(courseData);
    };

    fetchCourses();
  }, []);

  const rows = courses.map((course, index) => ({
    id: index + 1,
    col1: course.code,
    col2: course.name,
    col3: course.credits,
  }));

  const columns = [
    { field: "col1", headerName: "Code", width: 150 },
    { field: "col2", headerName: "Name", width: 150 },
    { field: "col3", headerName: "Credits", width: 150 },
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
