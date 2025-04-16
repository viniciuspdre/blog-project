import express from 'express';
import cors from 'cors';
import { router } from './routes/routes'

export const createApp = () => {
  const app = express();
  
  app.use("/api", router)

  const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }

  app.use(cors(corsOptions));
  return app;
}