const Student = require("../models/student");

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addStudent = async (req, res) => {
    try {
        const { name, age,course,phno,city } = req.body;
        if(name & age & course & phno & city === ""){
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const student = await Student.create({
            name,
            age,
            course,
            phno,
            city
        });
        res.status(201).json({ student, message: "Student added successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ student, message: "Student updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
};