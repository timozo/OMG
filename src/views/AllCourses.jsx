import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { firestore } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AddRatingModalBox from "../components/AddRatingModalBox";
import Modal from '@mui/material/Modal';

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [courseCode, setCourseCode] = useState(null);

  function handleAddRating(courseCode) {
    handleOpen();
    setCourseCode(courseCode);
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(firestore, "courses");
        const coursesSnapshot = await getDocs(coursesCollection);

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

        await Promise.all(promises);
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourses();
  }, []);

  function handleAddRating(code) {
    handleOpen(code);
  };

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
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddRatingModalBox courseCode={courseCode} />
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
