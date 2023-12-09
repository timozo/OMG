// AllCourses.js

import React, { Component } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { auth, firestore } from '../services/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import Modal from '@mui/material/Modal';
import { Rating } from '@mui/material';
import { Star } from '@mui/icons-material';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

class AllCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      open: false,
      courseCode: '',
      contentRating: 0,
      qualityRating: 0,
      workloadRating: 0,
      comment: '',
    };
  }

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses = async () => {
    try {
      const coursesCollection = collection(firestore, 'courses');
      const coursesSnapshot = await getDocs(coursesCollection);

      const courseData = [];
      const promises = coursesSnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const courseCode = data['course-code'];

        // Query the ratings collection for the specified courseCode
        const ratingsCollection = collection(firestore, 'ratings');
        const ratingsQuery = query(
          ratingsCollection,
          where('courseCode', '==', courseCode)
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
          name: data['name'],
          credits: data['credits'],
          rating: totalAvgRating.toFixed(2), // Rounded to 2 decimal places
        });
      });

      await Promise.all(promises);
      this.setState({ courses: courseData });
    } catch (error) {
      console.error('Error fetching course details:', error.message);
    }
  };

  handleButtonClick = (courseCode) => {
    this.setState({ courseCode, open: true });
  };

  handleSubmission = async () => {
    try {
      const { courseCode, contentRating, qualityRating, workloadRating, comment } =
        this.state;

      const user = auth.currentUser;

      if (!user) {
        // Handle user not logged in
        return;
      }

      const userUid = user.uid;

      // Add a new rating to the "ratings" collection in Firestore
      const ratingsCollection = collection(firestore, 'ratings');

      await addDoc(ratingsCollection, {
        courseCode,
        contentRating,
        qualityRating,
        workloadRating,
        avgRating: this.calculateAvgRating(), // Add the avgRating field
        comment,
        userUid,
        timestamp: new Date(),
      });

      // Reset form after submission
      this.setState({
        contentRating: 0,
        qualityRating: 0,
        workloadRating: 0,
        comment: '',
        open: false,
      });

      // Fetch courses again to update the course list
      await this.fetchCourses();

      // You can add further logic, like showing a success message or redirecting the user.
    } catch (error) {
      console.error('Error submitting rating:', error.message);
      // Handle error, e.g., show an error message to the user.
    }
  };

  calculateAvgRating = () => {
    const { contentRating, qualityRating, workloadRating } = this.state;
    return (contentRating + qualityRating + workloadRating) / 3;
  };

  render() {
    const { courses, open, courseCode, contentRating, qualityRating, workloadRating, comment } =
      this.state;

    const rows = courses.map((course, index) => ({
      id: index + 1,
      col1: course.code,
      col2: course.name,
      col3: course.credits,
      col4: course.rating,
      col5: (
        <button
          className="btn filled primary"
          onClick={() => this.handleButtonClick(course.code)}
        >
          Add Rating
        </button>
      ),
      col6: (
        <button className="see_more">{/* Add your See more button content here */}</button>
      ),
    }));

    const columns = [
      { field: 'col1', headerName: 'Code', width: 150 },
      { field: 'col2', headerName: 'Name', width: 150 },
      { field: 'col3', headerName: 'Credits', width: 150 },
      { field: 'col4', headerName: 'Rating', width: 150 },
      {
        field: 'col5',
        headerName: '',
        width: 200,
        renderCell: (params) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {params.value}
          </div>
        ),
      },
      {
        field: 'col6',
        headerName: '',
        width: 200,
        renderCell: (params) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {params.value}
          </div>
        ),
      },
    ];

    return (
      <>
        <Modal
          open={open}
          onClose={() => this.setState({ open: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rating-modal">
            <h1 style={{ fontSize: '30px', marginBottom: '30px' }}>
              Rating the course {courseCode}
            </h1>

            <div className="container">
              <div>
                <p>Content</p>
                <Rating
                  value={contentRating}
                  precision={1}
                  onChange={(event, newValue) => this.setState({ contentRating: newValue })}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
              <div>
                <p>Quality</p>
                <Rating
                  value={qualityRating}
                  precision={1}
                  onChange={(event, newValue) => this.setState({ qualityRating: newValue })}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
              <div>
                <p>Workload</p>
                <Rating
                  value={workloadRating}
                  precision={1}
                  onChange={(event, newValue) => this.setState({ workloadRating: newValue })}
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
              value={comment}
              onChange={(event) => this.setState({ comment: event.target.value })}
            />

            <a className="btn outline" onClick={this.handleSubmission}>
              Submit Rating
            </a>
          </Box>
        </Modal>
        <div style={{ padding: '2rem' }}>
          <DataGrid
            style={{ marginTop: "7rem", background: 'white', padding: '1rem', borderRadius: '27px' }}
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

export default AllCourses;
