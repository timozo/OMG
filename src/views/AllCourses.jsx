import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { auth, firestore } from "../services/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import Modal from '@mui/material/Modal';
import arrow from "../assets/arrow_forward.svg";
import { Rating } from '@mui/material';
import { Star } from '@mui/icons-material';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';


export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  const [open, setOpen] = useState(false);
  const [courseCode, setCourseCode] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleButtonClick(courseCode) {
    setCourseCode(courseCode)
    setOpen(true)
  }

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

  const rows = courses.map((course, index) => ({
    id: index + 1,
    col1: course.code,
    col2: course.name,
    col3: course.credits,
    col4: course.rating,
    col5: (
      <button
        className="btn filled primary"
        onClick={() => handleButtonClick(course.code)}
      >
        Add Rating
      </button>
    ),
    col6: (
      <button
        className="see_more"
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


  // MODAL
  const [contentRating, setContentRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [workloadRating, setWorkloadRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
      const fetchCourses = async () => {
          const coursesCollection = collection(firestore, 'courses');
          const coursesQuery = query(coursesCollection);
          const coursesSnapshot = await getDocs(coursesQuery);

          const courseData = [];
          coursesSnapshot.forEach((doc) => {
              const data = doc.data();
              courseData.push({
                  id: doc.id,
                  code: data['course-code'],
                  name: data['name'],
                  // Add other fields if needed
              });
          });

          // setCourses(courseData);
      };

      fetchCourses();
  }, []);

  const calculateAvgRating = () => {
      return (contentRating + qualityRating + workloadRating) / 3;
  };

  const handleSubmission = async () => {
      try {
          const user = auth.currentUser;

          if (!user) {
              // Handle user not logged in
              return;
          }

          const userUid = user.uid;

          // Add a new rating to the "ratings" collection in Firestore
          const ratingsCollection = collection(firestore, 'ratings');

          await addDoc(ratingsCollection, {
              courseCode: courseCode,
              contentRating,
              qualityRating,
              workloadRating,
              avgRating: calculateAvgRating(), // Add the avgRating field
              comment,
              userUid,
              timestamp: new Date(),
          });

          // Reset form after submission
          setContentRating(0);
          setQualityRating(0);
          setWorkloadRating(0);
          setComment('');

          setOpen(false)

          // You can add further logic, like showing a success message or redirecting the user.
      } catch (error) {
          console.error('Error submitting rating:', error.message);
          // Handle error, e.g., show an error message to the user.
      }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='rating-modal' style={style}>
          <h1 style={{ fontSize: '30px', marginBottom: '30px' }}>Rating the course {courseCode}</h1>

          <div className='container'>
            <div>
                <p>Content</p>
                <Rating
                  value={contentRating}
                  precision={1}
                  onChange={(event, newValue) => { setContentRating(newValue); }}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </div>
            <div>
                <p>Quality</p>
                <Rating
                  value={qualityRating}
                  precision={1}
                  onChange={(event, newValue) => { setQualityRating(newValue); }}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </div>
            <div>
                <p>Workload</p>
                <Rating
                  value={workloadRating}
                  precision={1}
                  onChange={(event, newValue) => { setWorkloadRating(newValue) }}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>

            <TextField
              id="filled-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
              variant="filled"
              onChange={(event) => {setComment(event.target.value)}}
            />
                
            <a className='btn outline' onClick={() => handleSubmission()}>Submit Rating</a>
        </Box>
      </Modal>
      <div style={{ padding: "2rem" }}>
        <DataGrid
          style={{background: "white", padding: "1rem", borderRadius: "27px"}}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        />
      </div>
    </>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
