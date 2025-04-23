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

  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

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
      setEditStudent(null);
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
    setEditStudent(null);
  };

  // Xử lý hủy sửa
  const handleCancelEdit = () => {
    setEditStudent(null);
  };

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Xử lý thay đổi lớp được chọn
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // Lấy danh sách lớp duy nhất
  const uniqueClasses = [...new Set(students.map((student) => student.className))];

  // Lọc danh sách sinh viên theo tìm kiếm và lớp
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.className === selectedClass;
    return matchesSearch && matchesClass;
  });

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

      {/* Tìm kiếm và lọc */}
      <div className="filter-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm theo tên..."
          />
        </div>
        <div className="class-filter">
          <label>Lọc theo lớp:</label>
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="class-select"
          >
            <option value="all">Tất cả</option>
            {uniqueClasses.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
      </div>

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
          {filteredStudents.map((student) => (
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