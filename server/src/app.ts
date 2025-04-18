import express from 'express';
import cors from 'cors';
import { router } from './routes/routes' 

export const createApp = () => {
  const app = express();

  const corsOptions = {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/api", router);

  return app;
}