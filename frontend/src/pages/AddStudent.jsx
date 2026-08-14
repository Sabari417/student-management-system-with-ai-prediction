import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import api from "../api";

const emptyForm = {
    name: "",
    age: "",
    department: "",
    email: "",
    phone: "",
    year: ""
};

const AddStudent = () => {
    const [formData, setFormData] = useState(emptyForm);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/students", {
                name: formData.name,
                age: Number(formData.age),
                department: formData.department,
                email: formData.email,
                phone: formData.phone,
                year: Number(formData.year)
            });

            alert("Student added successfully!");

            setFormData(emptyForm);

            navigate("/students");
        } catch (error) {
            console.error("Add student error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to add student"
            );
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Add Student</h1>
                    <p>Enter the student's information below.</p>
                </div>

                <Link to="/students" className="secondary-button">
                    ← Back to Students
                </Link>
            </div>

            <div className="form-card">
                <StudentForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    editing={null}
                />
            </div>
        </div>
    );
};

export default AddStudent;