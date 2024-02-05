import { body, validationResult } from 'express-validator';

export const validateRegisterUser = [
    body('full_name')
        .trim()
        .notEmpty()
        .withMessage('Full name is required'),
    body('nickname')
        .trim()
        .notEmpty()
        .withMessage('Nickname is required'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Invalid format'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
    body('role')
        .trim()
        .notEmpty()
        .isIn(['admin', 'user'])
        .withMessage('Invalid user role'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

export const validateLoginUser = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Invalid format'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        next();
    }
];

export const validateFieldsVideo = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('url')
        .trim()
        .notEmpty()
        .withMessage('URL is required'),
    body('credits')
        .trim()
        .notEmpty()
        .withMessage('Credits is required'),
    body('ranking')
        .isFloat({ min: 0, max: 5 })
        .notEmpty()
        .withMessage('Invalid ranking'),
    body('categories')
        .trim()
        .isIn(['Science', 'Technology', 'Art', 'History', 'Sports', 'Business', 'Finance'])
        .withMessage('Invalid category'),
    (req, res, next) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        next();
    }
];