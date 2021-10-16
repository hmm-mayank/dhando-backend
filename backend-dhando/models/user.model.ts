import * as Sequelize from 'sequelize'
import {sequelize}  from '../db/config'
import {INTEGER, STRING} from "sequelize";

export interface UserAddModel {
    id?: number
    email?: string
    password: string
    phoneNumber: string
    countryCode?:number
    name?:string,
    gender?:string,
    role?:string,
    dob?:string
}

// TODO add Address for the Shop and User.

export interface AddressModal {
        id?:number,
        lat?:string,
        long?:string,
        address?:string,
        city?:string,
        state?:string,
        country?:string,
        zipCode?:number

}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
    id: number
    phoneNumber?: string
    createdAt: string
    password:string
    updatedAt: string
}

export interface UserViewModel {
    id: number
    phoneNumber:string
}


// @ts-ignore
export const User = sequelize.define<UserModel, UserAddModel>('user', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role:STRING,
    email:Sequelize.STRING,
    phoneNumber:{
        unique:true,
        type:STRING
    },
    password: Sequelize.STRING,
    countryCode:INTEGER,
    dob:STRING,
    gender:STRING,
    name:STRING



},{
    createdAt: true,
    updatedAt:true

})