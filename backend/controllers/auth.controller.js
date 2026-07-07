import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  // created two different tokens, one for access and one for refresh
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({email});

    if(userExists) {
    return res.status(400).json({message: "User already exists"});  
    }

    const user = await User.create({name, email, password});

    //authentication token generation logic
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(201).json({user,message: "User created successfully",});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const login = async (req, res) => {
  res.send("Login route is working");
}

export const logout = async (req, res) => {
  res.send("Logout route is working");
}
