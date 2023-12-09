import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../services/firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

const RatingsPage = () => {
    const [selectedOption, setSelectedOption] = useState('code');
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [contentRating, setContentRating] = useState(1);
    const [qualityRating, setQualityRating] = useState(1);
    const [workloadRating, setWorkloadRating] = useState(1);
    const [comment, setComment] = useState('');
    const [courses, setCourses] = useState([]);

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

            setCourses(courseData);
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

            // Fetch the corresponding course code based on the selected course name
            let selectedCourseCode = '';
            if (selectedOption === 'name') {
                const matchingCourse = courses.find(course => course.name && course.name.toUpperCase() === courseName.toUpperCase());
                if (matchingCourse) {
                    selectedCourseCode = matchingCourse.code || '';
                }
            } else {
                // If 'code' is selected, use the entered course code
                selectedCourseCode = courseCode;
            }

            // Add a new rating to the "ratings" collection in Firestore
            const ratingsCollection = collection(firestore, 'ratings');

            await addDoc(ratingsCollection, {
                courseCode: selectedCourseCode,
                contentRating,
                qualityRating,
                workloadRating,
                avgRating: calculateAvgRating(), // Add the avgRating field
                comment,
                userUid,
                timestamp: new Date(),
            });

            // Reset form after submission
            setCourseCode('');
            setCourseName('');
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
                <label>
                    <input
                        type="radio"
                        value="code"
                        checked={selectedOption === 'code'}
                        onChange={() => setSelectedOption('code')}
                    />
                    Choose by Code
                </label>
                <label>
                    <input
                        type="radio"
                        value="name"
                        checked={selectedOption === 'name'}
                        onChange={() => setSelectedOption('name')}
                    />
                    Choose by Name
                </label>
            </div>
            {selectedOption === 'code' && (
                <div>
                    <label>Course Code:</label>
                    <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
                </div>
            )}
            {selectedOption === 'name' && (
                <div>
                    <label>Course Name:</label>
                    <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                </div>
            )}
            <div>
                <label>Choose Course:</label>
                <select value={selectedOption === 'code' ? courseCode : courseName} onChange={(e) => selectedOption === 'code' ? setCourseCode(e.target.value) : setCourseName(e.target.value)}>
                    <option value="" disabled>Select a course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={selectedOption === 'code' ? course.code : course.name}>
                            {selectedOption === 'code' ? course.code : course.name}
                        </option>
                    ))}
                </select>
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
