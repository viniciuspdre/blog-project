import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../models/http-response-models";
import { forbidden } from "./http-helper";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../models/JwtPayload";
import { AuthenticatedRequest } from "../models/AuthenticatedRequest";

const checkToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  let response: HttpResponse | null = null;

  if(!token) {
    response = await forbidden("Acesso negado!");
    res.status(response.statusCode).json(response.body);
  } else {
      const secret = process.env.JWT_SECRET;

      if(secret) {
        jwt.verify(token, secret, async (err, decodedPayload) => {
          if (err) {
            response = await forbidden("Token JWT inválido ou expirado.");
            res.status(response.statusCode).json(response.body);
          }
          req.user = decodedPayload as JwtPayload; 
          
        });
        next();
      }
  }
}

export { checkToken };