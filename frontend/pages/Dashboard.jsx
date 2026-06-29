import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    phno: "",
    city: ""
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add Student
  const addStudent = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/students",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setForm({
        name: "",
        age: "",
        course: "",
        phno: "",
        city: ""
      });

      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add student");
    }
  };

  // Edit Student
  const editStudent = (student) => {
    setForm({
      name: student.name,
      age: student.age,
      course: student.course,
      phno: student.phno,
      city: student.city
    });

    setEditId(student._id);
  };

  // Update Student
  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/students/${editId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEditId(null);

      setForm({
        name: "",
        age: "",
        course: "",
        phno: "",
        city: ""
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      <div className="top-bar">
        <h1>Student Management Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <form
        className="student-form"
        onSubmit={editId ? updateStudent : addStudent}
      >

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
        />

        <input
          type="number"
          name="phno"
          placeholder="Phone Number"
          value={form.phno}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>

      </form>

      <div className="student-list">
        <h2>All Students</h2>

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map((student) => (
            <div className="student-card" key={student._id}>

              <div>
                <h3>{student.name}</h3>
                <p>Age: {student.age}</p>
                <p>Course: {student.course}</p>
                <p>Phone Number: {student.phno}</p>
                <p>City: {student.city}</p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => editStudent(student)}>
                  Edit
                </button>

                <button onClick={() => deleteStudent(student._id)}>
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;