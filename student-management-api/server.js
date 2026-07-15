const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get("/", function (request, response) {
  response.status(200).json({
    success: true,
    message: "Welcome to Student Management API",
    endpoints: {
      students: "/api/students",
      singleStudent: "/api/students/:id"
    }
  });
});

app.use("/api/students", studentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, function () {
  console.log("Student API running on http://localhost:" + PORT);
});
