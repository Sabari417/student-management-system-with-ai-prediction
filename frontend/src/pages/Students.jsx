import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentTable from "../components/StudentTable";
import api from "../api";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [editingStudent, setEditingStudent] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");

            const data =
                response.data.data ||
                response.data.students ||
                response.data;

            setStudents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch students error:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }

        try {
            await api.delete(`/students/${id}`);

            alert("Student deleted successfully!");

            fetchStudents();
        } catch (error) {
            console.error("Delete student error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete student"
            );
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    const filteredStudents = students.filter((student) => {
        const text = search.toLowerCase();

        const matchesSearch =
            student.name?.toLowerCase().includes(text) ||
            student.department?.toLowerCase().includes(text) ||
            student.email?.toLowerCase().includes(text) ||
            student.phone?.includes(text);

        const matchesDepartment =
            !departmentFilter ||
            student.department?.toLowerCase() ===
                departmentFilter.toLowerCase();

        return matchesSearch && matchesDepartment;
    });

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Students</h1>
                    <p>Manage all student records.</p>
                </div>

                <Link to="/students/add" className="primary-button">
                    + Add Student
                </Link>
            </div>

            <div className="content-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={departmentFilter}
                        onChange={(e) =>
                            setDepartmentFilter(e.target.value)
                        }
                    >
                        <option value="">All Departments</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="IT">IT</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                    </select>
                </div>

                <div className="section-title">
                    <div>
                        <h2>Student Records</h2>
                        <p>
                            {filteredStudents.length} student(s) found
                        </p>
                    </div>
                </div>

                <StudentTable
                    students={filteredStudents}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {editingStudent && (
                <div className="edit-info">
                    Editing: <strong>{editingStudent.name}</strong>
                    <button
                        onClick={() => setEditingStudent(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default Students;