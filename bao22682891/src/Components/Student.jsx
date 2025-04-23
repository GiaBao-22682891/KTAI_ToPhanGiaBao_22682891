import React, { useState } from 'react';
import '../CSS/Student.css';

const Student = () => {
  // Dữ liệu sinh viên mẫu
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', className: '12A1', age: 18 },
    { id: 2, name: 'Trần Thị B', className: '12A2', age: 17 },
    { id: 3, name: 'Lê Văn C', className: '12A3', age: 18 },
  ]);

  // Hàm xóa sinh viên
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="container">
      <h1>Danh Sách Sinh Viên</h1>
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