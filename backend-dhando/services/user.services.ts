// src/services/user.service.ts

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { User, UserModel, UserAddModel, UserViewModel } from '../models/user.model'
import {MessageService} from "./message.service";
const messageService = new MessageService();
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

    register({ phoneNumber, password,role }: UserAddModel) {
        return bcrypt.hash(password, this._saltRounds)

        .then(hash => {
                // @ts-ignore
            return User.findOne({where:{'phoneNumber':phoneNumber}}).then(user=>{
                    if (user){
                        let randomNum = Math.floor(1000 + Math.random() * 9000);
                       return messageService.register({phone:phoneNumber,otp:randomNum,userId:user?.id}).then(e=> {
                          return user
                       })

                    }
                    else {
                        return User.create({ countryCode:91,phoneNumber:phoneNumber, password: hash,role })
                            .then(async u =>  this.getUserById(u!.id))
                    }
                })

            })
    }

    login({ phoneNumber,password }: UserAddModel) {
        let num =phoneNumber;
        return User.findOne({ where: { phoneNumber } }).then(async u => {
            // @ts-ignore
            let [result] = await Promise.all([messageService.getMessageByUserId({phone: num})])
            console.log(result["dataValues"]["otp"].toString(),password.toString())
            if(result["dataValues"]["otp"].toString() == password.toString()) {
                    return u;

            }
            return {message:"Check phone and password"}




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

    async getUserById(id: number) {
        return await User.findByPk(id, {
            attributes: UserService.userAttributes
        }) 
    }
}