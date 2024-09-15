import type { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 8080;

type Error = {
    status: number;
    message: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Allow requests from client
app.use(cors({ origin: 'http://localhost:5173' }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// const indexRouter = require('./routes/index');
app.use('/', (req, res) => {
  console.log('GET /');
  res.json({ message: 'Hello from server!' });
});

// Error handling middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = {
    message: 'Not found',
    status: 404
  };
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});