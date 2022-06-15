const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const methodOverride = require("method-override");
const connectDB = require("./config/database/db");
const cors = require("cors");

dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 8080;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/file"));
app.use("/api", require("./routes/folders"));
app.use("/", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
