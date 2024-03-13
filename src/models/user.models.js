import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    username: {
      type: string,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstname: {
      type: string,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: string,
      required: [true, "Password is required."],
    },
    avtar: {
      type: string,
      required: true,
    },
    coverimage: {
      type: string,
    },
    refreshtoken: {
      type: string,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "videos",
      },
    ],
  },
  {
    timestamps: true,
  },

  userSchema.pre("save", async function (next) {
    if (!this.isModified) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }),
  (userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
  }),
);
userSchema.methods.generateAcessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SCRETE,
    {
      expiresIn: process.env.ACESS_TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
          _id: this._id,
        },
        process.env.REFRESH_TOKEN_SCRETE,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
      );
};


export const User = mongoose.model("User", userSchema);
