import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface UserType extends Document {
  fullName: string;
  userName: string;
  password: string;
  imgUrl: string;
  gender: "male" | "female";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSignUpType {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  imgUrl?: string;
  gender: "male" | "female";
}

export interface CustomRequest<T> extends Request {
  user?: UserType;
  body: T;
}

export interface MessageType {
  message: string;
}
