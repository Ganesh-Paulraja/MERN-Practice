import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";




const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
      trim: true,
      maxlength: [25, "Invalid name. Please enter fewer than 25 characters"],
      minlength: [3, "Name should contain at least 3 characters"],
    },




    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },




    password: {
      type: String,
      required: [true, "Please Enter your password"],
      minlength: [8, "Password should be at least 8 characters"],
      select: false, // hide password from queries
    },




    avatar: {
      public_id: {
        type: String,
        default: "sample_public_id",
      },
      url: {
        type: String,
        default: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      },
    },




    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },




    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);




// Hash password before saving
userSchema.pre("save", async function (next) { // trigger when user.save()
  if (!this.isModified("password")) { //if no changes in password no hashing
    return next();
  }




  this.password = bcryptjs.hash(this.password, 10);
  next();
});




// Generate JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};




// Compare entered password with hashed password
userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};




// Generate password reset token -- for forget password
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");




  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");




  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;//30minutes




  return resetToken;
};




const User = mongoose.model("User", userSchema);




export default User;
