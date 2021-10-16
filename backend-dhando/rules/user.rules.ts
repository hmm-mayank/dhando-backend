
import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'
import { User } from '../models/user.model'


export const userRules = {
    forRegister: [
        check('phoneNumber')
            .isLength({min:10,max:10}).withMessage('Invalid phone format'),
        check('password')
            .isLength({ min: 4 }).withMessage('Invalid password'),
        check('confirmPassword')
            .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
    ],
    forLogin: [
        check('phoneNumber')
            .isLength({min: 10, max: 10}).withMessage('Invalid email format')
            .custom(phoneNumber => User.findOne({ where: { phoneNumber } }).then(u => !!u)).withMessage('Invalid phone'),
        check('password')
            .custom(  (password, {req}) =>  User.findOne({where: {phoneNumber: req.body.phoneNumber}}).then(u=>{
             return  bcrypt.compare(password, u!.password).then(e=>  e)
            })).withMessage('Invalid email or password')
    ]
}