import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { firestore } from "../services/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import arrow from "../assets/arrow_forward.svg";

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
          code: data["courseCode"],
          rating: data["avgRating"],
        });
      });

      return ratingsData;
    };

    const fetchData = async () => {
      const courses = await fetchCourses();
      const ratings = await fetchRatings();

      // Match ratings with courses based on ID
      const updatedCourses = courses.map((course) => {
        const matchingRating = ratings.find(
          (rating) => rating.code === course.code
        );
        return {
          ...course,
          rating: matchingRating ? matchingRating.rating : 0,
        };
      });

      setCourses(updatedCourses);
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
    col5: (
      <button
        className="btn filled primary"
        /*onClick={() => handleButtonClick(course.id)}*/
      >
        Add Rating
      </button>
    ),
    col6: (
      <button

      /*onClick={() => handleButtonClick(course.id)}*/
      >
        See more <img src={arrow} alt="arrow forward" />
      </button>
    ),
  }));

  const columns = [
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
    {
      field: "col6",
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
    <div style={{ background: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
      />
    </div>
  );
}
