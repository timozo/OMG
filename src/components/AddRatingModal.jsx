import "../Components.css"
import { useState, useEffect } from 'react';
import { auth, firestore } from '../services/firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { Star } from '@mui/icons-material';
import { TextField } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



export default function AddRatingModal({handleOpen, handleClose}) {
    // sets the course code from the route (:id)
    let { courseCode } = useParams();

    const [contentRating, setContentRating] = useState(0);
    const [qualityRating, setQualityRating] = useState(0);
    const [workloadRating, setWorkloadRating] = useState(0);
    const [comment, setComment] = useState('');
    // const [courses, setCourses] = useState    

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
                courseCode,
                contentRating,
                qualityRating,
                workloadRating,
                avgRating: calculateAvgRating(), // Add the avgRating field
                comment,
                userUid,
                timestamp: new Date(),
            });

            // Reset form after submission
            setContentRating(1);
            setQualityRating(1);
            setWorkloadRating(1);
            setComment('');

            // You can add further logic, like showing a success message or redirecting the user.
        } catch (error) {
            console.error('Error submitting rating:', error.message);
            // Handle error, e.g., show an error message to the user.
        }
    };

    return (
        <Modal
            open={handleOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <div className='rating-modal' style={style}>
                <h1 style={{ fontSize: '30px', marginBottom: '30px' }}>Ratings Page</h1>

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
                            onChange={(event, newValue) => { setWorkloadRating(newValue); }}
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
                />
                    
                <a className='btn outline' onClick={handleSubmission}>Submit Rating</a>

            </div>
            </Box>
        </Modal>
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