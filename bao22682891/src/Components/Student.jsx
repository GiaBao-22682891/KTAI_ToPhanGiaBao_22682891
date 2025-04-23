import React, { useState } from 'react';
import '../CSS/Student.css';

const Student = () => {
const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', className: '12A1', age: 18 },
    { id: 2, name: 'Trần Thị B', className: '12A2', age: 17 },
    { id: 3, name: 'Lê Văn C', className: '12A3', age: 18 },
    ]);

    // State cho form input
    const [newStudent, setNewStudent] = useState({
    name: '',
    className: '',
    age: '',
    });

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
    };

    // Xử lý thêm sinh viên
    const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.className || !newStudent.age) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    const student = {
        id: students.length + 1, // Tạo ID đơn giản (có thể dùng UUID trong thực tế)
        name: newStudent.name,
        className: newStudent.className,
        age: parseInt(newStudent.age),
    };

    setStudents([...students, student]);
    setNewStudent({ name: '', className: '', age: '' }); // Reset form
    };

    // Xử lý xóa sinh viên
    const handleDelete = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    return (
    <div className="container">
        <h1>Danh Sách Sinh Viên</h1>
        
        {/* Form thêm sinh viên */}
        <form className="add-student-form" onSubmit={handleAddStudent}>
        <div className="form-group">
            <label>Họ tên:</label>
            <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            placeholder="Nhập họ tên"
            />
        </div>
        <div className="form-group">
            <label>Lớp:</label>
            <input
            type="text"
            name="className"
            value={newStudent.className}
            onChange={handleInputChange}
            placeholder="Nhập lớp"
            />
        </div>
        <div className="form-group">
            <label>Tuổi:</label>
            <input
            type="number"
            name="age"
            value={newStudent.age}
            onChange={handleInputChange}
            placeholder="Nhập tuổi"
            />
        </div>
        <button type="submit" className="add-button">Thêm sinh viên</button>
        </form>

        {/* Bảng danh sách sinh viên */}
        <table className="student-table">
        <thead>
            <tr>
            <th>Tên</th>
            <th>Lớp</th>
            <th>Tuổi</th>
            <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            {students.map((student) => (
            <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.age}</td>
                <td>
                <button
                    className="delete-button"
                    onClick={() => handleDelete(student.id)}
                >
                    Xóa
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default Student;