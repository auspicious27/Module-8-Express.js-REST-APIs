function validateStudent(input) {
  if (!input.name || input.name.trim().length < 3) {
    return "Name must be at least 3 characters";
  }

  if (!input.email || !input.email.includes("@")) {
    return "Valid email is required";
  }

  if (!input.course || input.course.trim() === "") {
    return "Course is required";
  }

  return null;
}

module.exports = validateStudent;
