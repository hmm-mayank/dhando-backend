import * as Sequelize from 'sequelize'
import {sequelize} from "../db/config";
import {INTEGER, STRING} from "sequelize";

export interface MessageModel {

    id?:number,
    userId:number,
    otp?:number,
    phone:string
}

export interface MessageViewModel {
    userId:number
}

export interface MessageGlobalModel extends  Sequelize.Model<MessageViewModel,MessageModel> {
    id?:number,
    userId?:number,
    phone?:string
}


export  const Message = sequelize.define<MessageGlobalModel,MessageModel>('message',{
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, otp: {
        type:INTEGER,
        validate:{
            notEmpty:true,
            isNumeric:true
        }
    },
    userId: {
        type: INTEGER,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    phone: {
        type: STRING,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    }

},{
    createdAt: true,
    updatedAt:true

})