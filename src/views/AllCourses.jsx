import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { firestore } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
// import arrow from "../assets/arrow_forward.svg";
import AddRatingModalBox from "../components/AddRatingModalBox";
import Modal from '@mui/material/Modal';

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  // manages the modal
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              totalAvgRating += ratingData.avgRating || 0;
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
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourses();
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
        onClick={() => handleOpen()}
      >
        Add Rating
      </button>
    ),
    col6: (
      <button

      /*onClick={() => handleButtonClick(course.id)}*/
      >
        See more{/* <img src={arrow} alt="arrow forward" /> */}
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
      <Modal
        open={handleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddRatingModalBox />
      </Modal>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
      />
    </div>
  );
}
