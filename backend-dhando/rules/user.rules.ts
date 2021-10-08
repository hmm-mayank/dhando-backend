
import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'
import { User } from '../models/user.model'


export const userRules = {
    forRegister: [
        check('phoneNumber')
            .isLength({min:10,max:10}).withMessage('Invalid phone format'),
        check('password')
            .isLength({ min: 8 }).withMessage('Invalid password'),
        check('confirmPassword')
            .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
    ],
    forLogin: [
        check('phoneNumber')
            .isEmail().withMessage('Invalid email format')
            .custom(phoneNumber => User.findOne({ where: { phoneNumber } }).then(u => !!u)).withMessage('Invalid email or password'),
        check('password')
            .custom((password, { req }) => {
                return User.findOne({ where: { phoneNumber: req.body.phoneNumber } })
                    .then(u => bcrypt.compare(password, u!.password))
            }).withMessage('Invalid email or password')
    ]
}