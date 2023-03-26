const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const userRouter = require("./routes/user.routes");
const noteRouter = require("./routes/note.routes");
const auth = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  await connection;
  try {
    console.log("Server is connected to MongoDB");
  } catch (error) {
    console.log("Server is not able to connected to MongoDB");
    console.log(error);
  }
  console.log(`Server is running on port ${process.env.port}`);
});
