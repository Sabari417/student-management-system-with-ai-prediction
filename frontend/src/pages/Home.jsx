import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-content">

                <div className="home-badge">
                    🎓 Web Development Project
                </div>

                <div className="home-icon">
                    🎓
                </div>

                <h1>
                    Student Management
                    <span> System</span>
                </h1>

                <p className="home-description">
                    A professional web-based platform designed to manage
                    student records, academic information, departments,
                    and student data efficiently from one centralized system.
                </p>

                <div className="home-buttons">
                    <Link to="/dashboard" className="primary-button">
                        Go to Dashboard →
                    </Link>

                    <Link to="/students" className="secondary-button">
                        View Students
                    </Link>
                </div>

                <div className="home-features">

                    <div className="home-feature-card">
                        <div className="feature-icon blue">
                            👨‍🎓
                        </div>

                        <h3>Student Management</h3>

                        <p>
                            Add, update, delete and manage student
                            information easily.
                        </p>
                    </div>

                    <div className="home-feature-card">
                        <div className="feature-icon purple">
                            📊
                        </div>

                        <h3>Dashboard Analytics</h3>

                        <p>
                            View student statistics and department
                            information through a simple dashboard.
                        </p>
                    </div>

                    <div className="home-feature-card">
                        <div className="feature-icon green">
                            🗂️
                        </div>

                        <h3>Academic Records</h3>

                        <p>
                            Maintain organized student information
                            including department and academic year.
                        </p>
                    </div>

                </div>

                <div className="technology-section">
                    <p>Built using modern web technologies</p>

                    <div className="technology-list">
                        <span>React</span>
                        <span>Vite</span>
                        <span>Node.js</span>
                        <span>Express</span>
                        <span>MySQL</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;