const StudentForm = ({ formData, setFormData, onSubmit, editing }) => {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={onSubmit} className="student-form">

            {/* Basic Information */}
            <div className="form-section">
                <div className="form-section-header">
                    <h2>Basic Information</h2>
                    <p>Enter the student's personal information.</p>
                </div>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            placeholder="Enter student name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            name="age"
                            type="number"
                            placeholder="Enter age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="IT">IT</option>
                            <option value="EEE">EEE</option>
                            <option value="MECH">MECH</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Year</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="student@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            placeholder="10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            required
                        />
                    </div>

                </div>
            </div>


            {/* Academic Information */}
            <div className="form-section academic-section">

                <div className="form-section-header">
                    <h2>Academic Information</h2>
                    <p>Enter the academic details used by the AI prediction model.</p>
                </div>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Attendance (%)</label>
                        <input
                            name="attendance"
                            type="number"
                            placeholder="e.g. 85"
                            value={formData.attendance}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Internal Marks</label>
                        <input
                            name="internal_marks"
                            type="number"
                            placeholder="e.g. 78"
                            value={formData.internal_marks}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Assignment Marks</label>
                        <input
                            name="assignment_marks"
                            type="number"
                            placeholder="e.g. 80"
                            value={formData.assignment_marks}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Previous GPA</label>
                        <input
                            name="previous_gpa"
                            type="number"
                            placeholder="e.g. 8.0"
                            value={formData.previous_gpa}
                            onChange={handleChange}
                            min="0"
                            max="10"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Study Hours / Day</label>
                        <input
                            name="study_hours"
                            type="number"
                            placeholder="e.g. 4"
                            value={formData.study_hours}
                            onChange={handleChange}
                            min="0"
                            max="24"
                            step="0.5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Backlogs</label>
                        <input
                            name="backlogs"
                            type="number"
                            placeholder="e.g. 0"
                            value={formData.backlogs}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                </div>
            </div>


            {/* Submit */}
            <div className="form-actions">
                <button type="submit" className="primary-button">
                    {editing ? "Update Student" : "Add Student"}
                </button>
            </div>

        </form>
    );
};

export default StudentForm;