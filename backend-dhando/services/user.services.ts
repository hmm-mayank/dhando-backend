// src/services/user.service.ts

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as Bluebird from 'Bluebird'
import { User, UserModel, UserAddModel, UserViewModel } from '../models/user.model'

export class UserService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = '0.rfyj3n9nzh'

    static get userAttributes() {
        return ['id', 'phoneNumber']
    }
    private static _user
    static get user() {
        return UserService._user
    }

    register({ phoneNumber, password }: UserAddModel) {
        console.log(phoneNumber);
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return User.create({ countryCode:91,phoneNumber:phoneNumber, password: hash })
                    .then(u => this.getUserById(u!.id))
            })
    }

    login({ phoneNumber }: UserAddModel) {
        return User.findOne({ where: { phoneNumber } }).then(u => {
            const { id, phoneNumber } = u!
            return { token: jwt.sign({ id, phoneNumber }, this._jwtSecret) }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false)
                    return
                }

                UserService._user = User.findByPk(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getUserById(id: number) {
        return User.findByPk(id, {
            attributes: UserService.userAttributes
        }) as Bluebird<UserViewModel>
    }
}