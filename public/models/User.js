const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    password: this.password
    

  };
};

module.exports = mongoose.model("User", UserSchema);
