import React, { useState } from 'react';
import '../CSS/Student.css';

const Student = () => {
  // Dữ liệu sinh viên mẫu
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', className: '12A1', age: 18 },
    { id: 2, name: 'Trần Thị B', className: '12A2', age: 17 },
    { id: 3, name: 'Lê Văn C', className: '12A3', age: 18 },
  ]);

  // State cho form thêm sinh viên
  const [newStudent, setNewStudent] = useState({
    name: '',
    className: '',
    age: '',
  });

  // State cho form sửa sinh viên
  const [editStudent, setEditStudent] = useState(null);

  // Xử lý thay đổi input (thêm sinh viên)
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
      id: students.length + 1,
      name: newStudent.name,
      className: newStudent.className,
      age: parseInt(newStudent.age),
    };

    setStudents([...students, student]);
    setNewStudent({ name: '', className: '', age: '' });
  };

  // Xử lý xóa sinh viên
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    if (editStudent && editStudent.id === id) {
      setEditStudent(null); // Đóng form sửa nếu sinh viên bị xóa
    }
  };

  // Xử lý bắt đầu sửa sinh viên
  const handleEdit = (student) => {
    setEditStudent({ ...student });
  };

  // Xử lý thay đổi input (sửa sinh viên)
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditStudent({ ...editStudent, [name]: value });
  };

  // Xử lý lưu thông tin sửa
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editStudent.name || !editStudent.className || !editStudent.age) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setStudents(
      students.map((student) =>
        student.id === editStudent.id
          ? { ...student, name: editStudent.name, className: editStudent.className, age: parseInt(editStudent.age) }
          : student
      )
    );
    setEditStudent(null); // Đóng form sau khi lưu
  };

  // Xử lý hủy sửa
  const handleCancelEdit = () => {
    setEditStudent(null);
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
            <React.Fragment key={student.id}>
              <tr>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(student)}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(student.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
              {/* Form sửa sinh viên (inline) */}
              {editStudent && editStudent.id === student.id && (
                <tr>
                  <td colSpan="4">
                    <form className="edit-student-form" onSubmit={handleSaveEdit}>
                      <div className="form-group">
                        <label>Họ tên:</label>
                        <input
                          type="text"
                          name="name"
                          value={editStudent.name}
                          onChange={handleEditInputChange}
                          placeholder="Nhập họ tên"
                        />
                      </div>
                      <div className="form-group">
                        <label>Lớp:</label>
                        <input
                          type="text"
                          name="className"
                          value={editStudent.className}
                          onChange={handleEditInputChange}
                          placeholder="Nhập lớp"
                        />
                      </div>
                      <div className="form-group">
                        <label>Tuổi:</label>
                        <input
                          type="number"
                          name="age"
                          value={editStudent.age}
                          onChange={handleEditInputChange}
                          placeholder="Nhập tuổi"
                        />
                      </div>
                      <div className="form-buttons">
                        <button type="submit" className="save-button">Lưu</button>
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={handleCancelEdit}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;