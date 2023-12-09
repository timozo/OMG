import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { firestore } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import arrow from "../assets/arrow_forward.svg";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(firestore, "courses");
        const coursesSnapshot = await getDocs(coursesCollection);

        const courseData = [];
        const promises = coursesSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const courseCode = data["course-code"];

          // Query the ratings collection for the specified courseCode
          const ratingsCollection = collection(firestore, "ratings");
          const ratingsQuery = query(
            ratingsCollection,
            where("courseCode", "==", courseCode)
          );
          const ratingsSnapshot = await getDocs(ratingsQuery);

          // Calculate the average rating
          let totalAvgRating = 0;

          if (ratingsSnapshot.size > 0) {
            ratingsSnapshot.forEach((ratingDoc) => {
              const ratingData = ratingDoc.data();
              totalAvgRating += ratingData.workloadRating || 0;
            });

            totalAvgRating /= ratingsSnapshot.size;
          }

          courseData.push({
            id: doc.id,
            code: courseCode,
            name: data["name"],
            credits: data["credits"],
            rating: totalAvgRating.toFixed(2), // Rounded to 2 decimal places
          });
        });

        await Promise.all(promises);
        courseData.sort((a, b) => b.rating - a.rating);
        const top20Courses = courseData.slice(0, 20);
        setCourses(top20Courses);
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourses();
  }, []);

  const rows = courses.map((course, index) => ({
    id: index + 1,
    col0: index < 5 ? "👑" : "",
    col1: course.code,
    col2: course.name,
    col3: course.credits,
    col4: course.rating,
    col5: (
      <button
        className="see_more"
        /*onClick={() => handleButtonClick(course.id)}*/
      >
        See more <img src={arrow} alt="arrow forward" />
      </button>
    ),
  }));

  const columns = [
    { field: "col0", headerName: "", width: 50 },
    { field: "col1", headerName: "Code", width: 150 },
    { field: "col2", headerName: "Name", width: 150 },
    { field: "col3", headerName: "Credits", width: 150 },
    { field: "col4", headerName: "Rating", width: 150 },
    {
      field: "col5",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <DataGrid
        style={{marginTop: "7rem", background: "white", padding: "1rem", borderRadius: "27px"}}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
      />
    </div>
  );
}
