import { ZodError } from 'zod';
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ message: error.errors });
        }
        else {
            next(error);
        }
    }
};
export default validateRequest;
