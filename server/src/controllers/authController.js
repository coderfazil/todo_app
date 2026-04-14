import User from "../models/User.js";
import { loginUser, registerUser } from "../services/authService.js";
import {
  getClearCookieOptions,
  getCookieOptions,
} from "../services/tokenService.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.trim().length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const result = await registerUser({ name, email, password });
    res.cookie("token", result.token, getCookieOptions());
    return res.status(201).json({ user: result.user });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await loginUser({ email, password });
    res.cookie("token", result.token, getCookieOptions());
    return res.json({ user: result.user });
  } catch (error) {
    return next(error);
  }
};

export const logout = (_req, res) => {
  res.clearCookie("token", getClearCookieOptions());
  return res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};
