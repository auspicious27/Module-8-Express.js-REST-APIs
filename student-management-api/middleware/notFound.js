function notFound(request, response) {
  response.status(404).json({
    success: false,
    message: "API route not found"
  });
}

module.exports = notFound;
