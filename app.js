const express = require("express");
const cors = require("cors");
const contactsRouter = require('./app/routes/contact.route'); // đúng tên file
const ApiError = require("./app/api-error");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book express application." });
});
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message ||" Internal Server Error", });
});
module.exports = app;
