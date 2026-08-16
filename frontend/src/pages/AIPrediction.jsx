import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const AIPrediction = () => {
    const [students, setStudents] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch students
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");

            const data =
                response.data.data ||
                response.data.students ||
                response.data;

            setStudents(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Failed to fetch students:", error);
            alert("Failed to load students");
        }
    };

    // Department selection
    const handleDepartmentChange = (e) => {
        const department = e.target.value;

        setSelectedDepartment(department);

        // Clear previously selected student
        setSelectedStudentId("");
        setSelectedStudent(null);
        setPrediction(null);
    };

    // Student selection
    const handleStudentChange = (e) => {
        const id = e.target.value;

        setSelectedStudentId(id);
        setPrediction(null);

        const student = students.find(
            (student) => String(student.id) === String(id)
        );

        setSelectedStudent(student || null);
    };

    // Filter students based on department
    const filteredStudents = students.filter(
        (student) =>
            student.department?.toLowerCase() ===
            selectedDepartment.toLowerCase()
    );

    // Prediction
    const handlePredict = async () => {
        if (!selectedStudent) {
            alert("Please select a student");
            return;
        }

        try {
            setLoading(true);
            setPrediction(null);

            const response = await api.post("/ml/predict", {
                attendance: Number(selectedStudent.attendance),
                internal_marks: Number(selectedStudent.internal_marks),
                assignment_marks: Number(selectedStudent.assignment_marks),
                previous_gpa: Number(selectedStudent.previous_gpa),
                study_hours: Number(selectedStudent.study_hours),
                backlogs: Number(selectedStudent.backlogs)
            });

            setPrediction(response.data);

        } catch (error) {
            console.error("Prediction error:", error);

            alert(
                error.response?.data?.message ||
                "Prediction failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">

            {/* Header */}

            <div className="page-header">
                <div>
                    <h1>AI Student Performance</h1>
                    <p>
                        Predict student performance using academic data.
                    </p>
                </div>

                <Link
                    to="/students"
                    className="secondary-button"
                >
                    ← Back to Students
                </Link>
            </div>


            {/* Main Card */}

            <div className="form-card">

                {/* Department Selection */}

                <div className="form-section-header">
                    <h2>Select Student</h2>

                    <p>
                        Select a department first, then choose a student
                        to analyze their academic performance.
                    </p>
                </div>


                <div className="form-grid">

                    {/* Department */}

                    <div className="form-group">
                        <label>Department</label>

                        <select
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                        >
                            <option value="">
                                Select Department
                            </option>

                            <option value="CSE">
                                CSE
                            </option>

                            <option value="ECE">
                                ECE
                            </option>

                            <option value="IT">
                                IT
                            </option>

                            <option value="EEE">
                                EEE
                            </option>

                            <option value="MECH">
                                MECH
                            </option>

                            <option value="CIVIL">
                                CIVIL
                            </option>
                        </select>
                    </div>


                    {/* Student */}

                    <div className="form-group">
                        <label>Student</label>

                        <select
                            value={selectedStudentId}
                            onChange={handleStudentChange}
                            disabled={!selectedDepartment}
                        >
                            <option value="">
                                {selectedDepartment
                                    ? "Select Student"
                                    : "Select Department First"}
                            </option>

                            {filteredStudents.map((student) => (
                                <option
                                    key={student.id}
                                    value={student.id}
                                >
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>


                {/* Academic Information */}

                {selectedStudent && (
                    <div className="academic-section">

                        <div className="form-section-header">
                            <h2>Academic Information</h2>

                            <p>
                                Information retrieved automatically
                                from the student database.
                            </p>
                        </div>


                        <div className="form-grid">

                            <div className="form-group">
                                <label>Attendance</label>

                                <input
                                    value={`${selectedStudent.attendance}%`}
                                    readOnly
                                />
                            </div>


                            <div className="form-group">
                                <label>Internal Marks</label>

                                <input
                                    value={selectedStudent.internal_marks}
                                    readOnly
                                />
                            </div>


                            <div className="form-group">
                                <label>Assignment Marks</label>

                                <input
                                    value={selectedStudent.assignment_marks}
                                    readOnly
                                />
                            </div>


                            <div className="form-group">
                                <label>Previous GPA</label>

                                <input
                                    value={selectedStudent.previous_gpa}
                                    readOnly
                                />
                            </div>


                            <div className="form-group">
                                <label>Study Hours / Day</label>

                                <input
                                    value={selectedStudent.study_hours}
                                    readOnly
                                />
                            </div>


                            <div className="form-group">
                                <label>Backlogs</label>

                                <input
                                    value={selectedStudent.backlogs}
                                    readOnly
                                />
                            </div>

                        </div>


                        {/* Predict Button */}

                        <div className="form-actions">

                            <button
                                onClick={handlePredict}
                                className="primary-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Predicting..."
                                    : "Predict Performance"}
                            </button>

                        </div>

                    </div>
                )}


                {/* Prediction Result */}

                {prediction && (
                    <div className="prediction-result">

                        <div className="form-section-header">
                            <h2>AI Prediction Result</h2>

                            <p>
                                Predicted performance for{" "}
                                <strong>
                                    {selectedStudent.name}
                                </strong>
                            </p>
                        </div>


                        <div className="prediction-grid">

                            <div className="prediction-card">

                                <span>
                                    Predicted Score
                                </span>

                                <strong>
                                    {prediction.predicted_score}
                                </strong>

                                <small>
                                    out of 100
                                </small>

                            </div>


                            <div className="prediction-card">

                                <span>
                                    Risk Level
                                </span>

                                <strong>
                                    {prediction.risk}
                                </strong>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default AIPrediction;