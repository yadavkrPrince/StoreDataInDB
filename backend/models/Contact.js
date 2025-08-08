import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: String
});

export default Contact = mongoose.model('Contact', ContactSchema);