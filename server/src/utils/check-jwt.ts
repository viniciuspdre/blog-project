import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../models/http-response-models";
import { badRequest, forbidden } from "./http-helper";
import jwt from 'jsonwebtoken';


const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  let response: HttpResponse | null = null;

  if(!token) {
    response = await forbidden("Acesso negado!");
    res.status(response.statusCode).json(response.body);
  } else {
      try {
        const secret = process.env.JWT_SECRET;
    
        if(secret) {
          jwt.verify(token, secret);
          next();
        }
      } catch (error) {
        response = await badRequest("Token inválido");
        res.status(response.statusCode).json(response.body);
      }
  }
}

export { checkToken };