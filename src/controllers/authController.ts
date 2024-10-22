import { Request, Response } from "express";
import { register, login } from "../services/authService";

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    res.status(201).send({ message: "User created", user });
  } catch (error) {
    res.status(500).send({ message: "Error creating user" });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { access_token, expires_in } = await login(email, password);
    res.status(200).send({ message: "User created", access_token, expires_in });
  } catch (error) {
    res.status(500).send({ message: "Error creating user" });
  }
};