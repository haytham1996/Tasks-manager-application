const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const Roles = {
  ADMIN: "admin",
  USER: "user",
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: [Roles.ADMIN, Roles.USER],
    },
  },
  schemaOptions
);

module.exports = mongoose.model("User", userSchema);
