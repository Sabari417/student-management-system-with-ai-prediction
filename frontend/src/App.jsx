import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";

import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <nav className="navbar">
                    <div className="nav-brand">
                        🎓 Student Management
                    </div>

                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/students">Students</Link>
                        <Link to="/students/add">
                            Add Student
                        </Link>
                    </div>
                </nav>

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/students"
                            element={<Students />}
                        />

                        <Route
                            path="/students/add"
                            element={<AddStudent />}
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;