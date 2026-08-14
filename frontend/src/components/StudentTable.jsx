const StudentTable = ({ students, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {students.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="no-data">
                            No students found
                        </td>
                    </tr>
                ) : (
                    students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.department}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.year}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-action btn-edit"
                                    onClick={() => onEdit(student)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="btn-action btn-delete"
                                    onClick={() => onDelete(student.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default StudentTable;