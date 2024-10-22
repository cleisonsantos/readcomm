import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return {
    id: user.id,
    createdAt: user.createdAt,
  };
};

export const login = async (email: string, password: string) => {
  const expires_in = 3600;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }
  const access_token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "secret",
    { expiresIn: expires_in }
  );
  return {
    access_token,
    expires_in,
  };
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Book: true,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      Book: true,
    },
  });
  return user;
};

export const getUserByToken = async (token: string) => {
  const { userId } = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
    userId: number;
  };
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Book: true,
    },
  });
  return user;
};
