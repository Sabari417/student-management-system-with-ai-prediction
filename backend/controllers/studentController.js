const db = require("../config/db");

const getStudents = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM students ORDER BY id ASC");

        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch students"
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM students WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch student"
        });
    }
};

const createStudent = async (req, res) => {
    try {
        const { name, age, department, email, phone, year } = req.body;

        if (!name || !age || !department || !email || !phone || !year) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO students
            (name, age, department, email, phone, year)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [name, age, department, email, phone, year]
        );

        const [rows] = await db.query(
            "SELECT * FROM students WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: rows[0]
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to add student"
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { name, age, department, email, phone, year } = req.body;

        if (!name || !age || !department || !email || !phone || !year) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const [result] = await db.query(
            `UPDATE students
            SET name = ?, age = ?, department = ?, email = ?, phone = ?, year = ?
            WHERE id = ?`,
            [name, age, department, email, phone, year, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM students WHERE id = ?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Student updated successfully",
            data: rows[0]
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update student"
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM students WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete student"
        });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};