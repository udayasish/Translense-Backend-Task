import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const validateRequest = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      next(error);
    }
  }
};

export default validateRequest;