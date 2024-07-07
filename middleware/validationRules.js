const { body } = require('express-validator');

const validationRules = [
    
    body('name').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Name is required!');
        }
        if (value.length < 3) {
            throw new Error('Name is too short!');
        }
        return true;
    }),
    body('institute').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Institute is required!');
        }
        if (value.length < 3) {
            throw new Error('Institute is too short!');
        }
        return true;
    }),
    body('specialityId').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Speciality is required!');
        }
        return true;
    }),
    body('availableFromDay').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Available from day is required!');
        }
        return true;
    }),
    body('availableToDay').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Available to day is required!');
        }
        return true;
    }),
    body('availableFromTime').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Available from time is required!');
        }
        return true;
    }),
    body('availableToTime').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Available to time is required!');
        }
        return true;
    }),
    body('biography').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Biography is required!');
        }
        if (value.length < 3) {
            throw new Error('Biography is too short!');
        }
        return true;
    }),
    body('experience').custom((value, { req }) => {
        if (value === undefined || value === null) {
            throw new Error('Experience is required!');
        }
        if (isNaN(value)) {
            throw new Error('Experience must be a number!');
        }
        if (value < 0) {
            throw new Error('Experience cannot be negative!');
        }
        return true;
    }),
    
    body('email').optional().isEmail().withMessage('Invalid email address!'),
    
    body('phone').custom((value, { req }) => {
        
        if (!value || value.trim() === '') {
            throw new Error('Phone number should not be empty!');
        }
        
        const phoneNumber = parsePhoneNumberFromString(value);
        
        if (!phoneNumber || !phoneNumber.isValid()) {
            throw new Error('Invalid phone number!');
        }
        return true;
    }),

    body('otp').optional().isString().withMessage('Enter OTP!')
];

//@exports
module.exports = { validationRules }