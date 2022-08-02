const { Schema, model } = require("mongoose");
const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../constants");

const UserSchema = new Schema({
  id: String,
  email: String,
  password: String,
  instruments_access: Boolean,
  updated_at: Date,
  created_at: Date,
});

UserSchema.pre("save", function (next) {
  if (!this.id) this.id = uuidv4();
  if (!this.updated_at) this.updated_at = new Date();
  if (!this.created_at) this.created_at = new Date();
  if (!this.instruments_access) this.instruments_access = true;
  if (this.isModified("password")) {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
          return;
        }
        this.password = hash;
        next();
      });
    });
    return;
  }
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports.UserModel = new model("User", UserSchema);
