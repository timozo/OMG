import React, { useState } from 'react';
import { auth, firestore } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

const RatingsPage = () => {
    const [courseCode, setCourseCode] = useState('');
    const [contentRating, setContentRating] = useState(1);
    const [qualityRating, setQualityRating] = useState(1);
    const [workloadRating, setWorkloadRating] = useState(1);
    const [comment, setComment] = useState('');

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
                comment,
                userUid,
                timestamp: new Date(),
            });

            // Reset form after submission
            setCourseCode('');
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '30px' }}>Ratings Page</h1>
            <div>
                <label>Course Code:</label>
                <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
            </div>
            <div>
                <label>Content Rating:</label>
                <input type="number" value={contentRating} onChange={(e) => setContentRating(Number(e.target.value))} />
            </div>
            <div>
                <label>Quality Rating:</label>
                <input type="number" value={qualityRating} onChange={(e) => setQualityRating(Number(e.target.value))} />
            </div>
            <div>
                <label>Workload Rating:</label>
                <input type="number" value={workloadRating} onChange={(e) => setWorkloadRating(Number(e.target.value))} />
            </div>
            <div>
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button onClick={handleSubmission}>Submit Rating</button>
        </div>
    );
};

export default RatingsPage;
