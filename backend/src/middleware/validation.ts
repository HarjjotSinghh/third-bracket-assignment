import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg,
      value: error.type === 'field' ? error.value : undefined,
    }));

    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Input validation failed',
        details: formattedErrors,
      },
    });
    return;
  }

  next();
};

export const validate = (validations: any[]) => [
  ...validations,
  handleValidationErrors,
];

// Export validation functions
export {
  validateUserRegistration,
  validateUserLogin,
  validateTaskCreation,
  validateTaskUpdate,
  validateTaskQuery,
  validateObjectId,
} from '../validation/validators';