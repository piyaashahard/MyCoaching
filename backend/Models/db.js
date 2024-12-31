// db.js
const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

const administrator_mongo_url =
  "mongodb+srv://shreyandeyrudra:vJ5snVUpP8on99ZU@cluster0.vy7rb.mongodb.net/Administrator?retryWrites=true&w=majority&appName=Cluster0";

// Check if the MongoDB URLs are available
if (!mongo_url) {
  console.error("MONGO_CONN is not defined in the environment variables.");
  process.exit(1);
}

if (!administrator_mongo_url) {
  console.error(
    "ADMINISTRATOR_MONGO_CONN is not defined in the environment variables."
  );
  process.exit(1);
}

// Connect to the primary MongoDB
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Primary MongoDB Connected...");
  })
  .catch((err) => {
    console.log("Primary MongoDB Connection Error: ", err);
  });

// Connect to the administrator MongoDB
const administratorConnection = mongoose.createConnection(
  administrator_mongo_url
);

administratorConnection
  .once("open", () => {
    console.log("Administrator MongoDB Connected...");
  })
  .on("error", (err) => {
    console.log("Administrator MongoDB Connection Error: ", err);
  });

module.exports = administratorConnection;
