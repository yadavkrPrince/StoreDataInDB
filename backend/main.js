const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

mongoose.connect("mongodb://localhost:27017/PKdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Mongoose connection successful");
});

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("Contact", contactSchema);

app.post("/post", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received form data:", name, email, message);

  try {
    const newUser = new User({ name, email, message });
    await newUser.save();
    console.log("Saved user:", newUser);
    res.status(201).send("Form submission successful");
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
