import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "./tokenService.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email: normalizeEmail(email) });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: normalizeEmail(email),
    password: hashedPassword,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: normalizeEmail(email) });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id),
  };
};
