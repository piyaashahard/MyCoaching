const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const adminRouter = require("./Routes/AdminRouter");
const instructorRoutes = require("./Routes/instructorRouter");
const userRouter = require("./routes/UserRouter");

require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/admin", adminRouter);
app.use("/instructors", instructorRoutes);
app.use("/users", userRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
