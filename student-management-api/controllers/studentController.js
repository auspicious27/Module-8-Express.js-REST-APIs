const students = require("../data/students");
const validateStudent = require("../validators/studentValidator");

function getAllStudents(request, response) {
  response.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
}

function getStudentById(request, response) {
  const studentId = Number(request.params.id);
  const student = students.find(function (item) {
    return item.id === studentId;
  });

  if (!student) {
    return response.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  response.status(200).json({
    success: true,
    data: student
  });
}

function createStudent(request, response) {
  const validationError = validateStudent(request.body);

  if (validationError) {
    return response.status(400).json({
      success: false,
      message: validationError
    });
  }

  const newStudent = {
    id: students.length + 1,
    name: request.body.name.trim(),
    email: request.body.email.trim(),
    course: request.body.course.trim()
  };

  students.push(newStudent);

  response.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
}

function updateStudent(request, response) {
  const studentId = Number(request.params.id);
  const student = students.find(function (item) {
    return item.id === studentId;
  });

  if (!student) {
    return response.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const validationError = validateStudent(request.body);

  if (validationError) {
    return response.status(400).json({
      success: false,
      message: validationError
    });
  }

  student.name = request.body.name.trim();
  student.email = request.body.email.trim();
  student.course = request.body.course.trim();

  response.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
}

function deleteStudent(request, response) {
  const studentId = Number(request.params.id);
  const studentIndex = students.findIndex(function (item) {
    return item.id === studentId;
  });

  if (studentIndex === -1) {
    return response.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  response.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent[0]
  });
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
