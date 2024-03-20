const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true , unique: true},
  type: { type: Number, required: true },
  password: { type: String, required: true },
  permissions: [{ type: Number }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
