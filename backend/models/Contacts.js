const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String, required: true},
  type: { type: String ,default:"Personal"},
});

module.exports = mongoose.model("Contacts", ContactSchema);
