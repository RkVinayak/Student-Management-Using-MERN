const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const { getStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

router.get("/", protect, getStudents);
router.post("/", protect, addStudent);
router.put("/:id",protect,updateStudent);
router.delete("/:id",protect,deleteStudent);
module.exports = router;