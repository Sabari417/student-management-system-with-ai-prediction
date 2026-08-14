import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get("/students");

                const data =
                    response.data.data ||
                    response.data.students ||
                    response.data;

                setStudents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Dashboard error:", error);
                setStudents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const totalStudents = students.length;

    const cseStudents = students.filter(
        (student) =>
            student.department?.toLowerCase() === "cse"
    ).length;

    const eceStudents = students.filter(
        (student) =>
            student.department?.toLowerCase() === "ece"
    ).length;

    const itStudents = students.filter(
        (student) =>
            student.department?.toLowerCase() === "it"
    ).length;

    const otherStudents =
        totalStudents -
        cseStudents -
        eceStudents -
        itStudents;

    const getPercentage = (count) => {
        if (totalStudents === 0) return 0;
        return Math.round((count / totalStudents) * 100);
    };

    const recentStudents = [...students]
        .reverse()
        .slice(0, 5);

    return (
        <div className="page-container">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <span className="dashboard-label">
                        MANAGEMENT OVERVIEW
                    </span>

                    <h1>Dashboard</h1>

                    <p>
                        Monitor student records, departments and
                        academic information from one place.
                    </p>
                </div>

                <Link
                    to="/students/add"
                    className="primary-button"
                >
                    + Add Student
                </Link>
            </div>

            {/* Statistics */}
            <div className="dashboard-cards">

                <div className="stat-card">
                    <div className="stat-icon blue">
                        👨‍🎓
                    </div>

                    <div>
                        <h3>Total Students</h3>
                        <p>{loading ? "—" : totalStudents}</p>
                        <span>Registered students</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">
                        💻
                    </div>

                    <div>
                        <h3>CSE Students</h3>
                        <p>{loading ? "—" : cseStudents}</p>
                        <span>
                            {getPercentage(cseStudents)}% of total
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        ⚡
                    </div>

                    <div>
                        <h3>ECE Students</h3>
                        <p>{loading ? "—" : eceStudents}</p>
                        <span>
                            {getPercentage(eceStudents)}% of total
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        🌐
                    </div>

                    <div>
                        <h3>IT Students</h3>
                        <p>{loading ? "—" : itStudents}</p>
                        <span>
                            {getPercentage(itStudents)}% of total
                        </span>
                    </div>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">

                <div className="section-heading">
                    <div>
                        <h2>Quick Actions</h2>
                        <p>
                            Common student management operations
                        </p>
                    </div>
                </div>

                <div className="quick-actions">

                    <Link
                        to="/students"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon blue">
                            📋
                        </div>

                        <div>
                            <h3>Student Records</h3>
                            <p>
                                View, search, edit and delete
                                student records.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </Link>

                    <Link
                        to="/students/add"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon green">
                            ➕
                        </div>

                        <div>
                            <h3>Add New Student</h3>
                            <p>
                                Register a new student in the
                                management system.
                            </p>
                        </div>

                        <span className="action-arrow">
                            →
                        </span>
                    </Link>

                </div>

            </div>

            {/* Main Dashboard Grid */}
            <div className="dashboard-grid">

                {/* Department Overview */}
                <div className="dashboard-section">

                    <div className="section-heading">
                        <div>
                            <h2>Department Overview</h2>
                            <p>
                                Student distribution by department
                            </p>
                        </div>
                    </div>

                    <div className="department-list">

                        <div className="department-item">
                            <div className="department-top">
                                <span>
                                    <span className="department-dot blue-dot"></span>
                                    Computer Science & Engineering
                                </span>

                                <strong>
                                    {cseStudents}
                                </strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress blue-progress"
                                    style={{
                                        width: `${getPercentage(cseStudents)}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="department-item">
                            <div className="department-top">
                                <span>
                                    <span className="department-dot purple-dot"></span>
                                    Electronics & Communication
                                </span>

                                <strong>
                                    {eceStudents}
                                </strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress purple-progress"
                                    style={{
                                        width: `${getPercentage(eceStudents)}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="department-item">
                            <div className="department-top">
                                <span>
                                    <span className="department-dot green-dot"></span>
                                    Information Technology
                                </span>

                                <strong>
                                    {itStudents}
                                </strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress green-progress"
                                    style={{
                                        width: `${getPercentage(itStudents)}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="department-item">
                            <div className="department-top">
                                <span>
                                    <span className="department-dot gray-dot"></span>
                                    Other Departments
                                </span>

                                <strong>
                                    {otherStudents}
                                </strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress gray-progress"
                                    style={{
                                        width: `${getPercentage(otherStudents)}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Recent Students */}
                <div className="dashboard-section">

                    <div className="section-heading">
                        <div>
                            <h2>Recent Students</h2>
                            <p>
                                Recently registered students
                            </p>
                        </div>

                        <Link
                            to="/students"
                            className="view-all-link"
                        >
                            View All
                        </Link>
                    </div>

                    {recentStudents.length === 0 ? (
                        <div className="empty-dashboard">
                            <div>📭</div>
                            <h3>No Students Yet</h3>
                            <p>
                                Add your first student to see
                                records here.
                            </p>
                        </div>
                    ) : (
                        <div className="recent-students">

                            {recentStudents.map((student) => (
                                <div
                                    className="recent-student"
                                    key={student.id}
                                >
                                    <div className="student-avatar">
                                        {student.name
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                    <div className="student-info">
                                        <strong>
                                            {student.name}
                                        </strong>

                                        <span>
                                            {student.email}
                                        </span>
                                    </div>

                                    <span className="department-badge">
                                        {student.department}
                                    </span>
                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

            {/* System Information */}
            <div className="dashboard-section system-section">

                <div className="section-heading">
                    <div>
                        <h2>System Information</h2>
                        <p>
                            Current application environment
                        </p>
                    </div>

                    <span className="system-status">
                        <span></span>
                        System Active
                    </span>
                </div>

                <div className="system-info-grid">

                    <div className="system-info-item">
                        <span>Frontend</span>
                        <strong>React + Vite</strong>
                    </div>

                    <div className="system-info-item">
                        <span>Backend</span>
                        <strong>Node.js + Express</strong>
                    </div>

                    <div className="system-info-item">
                        <span>Database</span>
                        <strong>MySQL</strong>
                    </div>

                    <div className="system-info-item">
                        <span>API</span>
                        <strong>REST API</strong>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;