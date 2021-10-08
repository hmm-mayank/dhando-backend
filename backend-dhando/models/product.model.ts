import * as Sequelize from 'sequelize'
import {sequelize}  from '../db/config'
import {FLOAT, INTEGER, STRING} from "sequelize";

export interface ProductGlobalModel {
    id?:number
    name:string
    image?:[string]
    mrp:number
    qrCode?:string
    barCode?:string
    source:string
}
export interface ProductAddModel {
    id?:number
    name:string
    image?:[string]
    mrp:number
    qrCode?:string
    barCode?:string
    source:string
}

export interface productModal extends Sequelize.Model<productModal,ProductAddModel>{
    id: number
    name:string
    image?:[string]
    mrp:number
    qrCode?:string
    barCode?:string
    source:string
}

export const Product = sequelize.define<productModal,ProductAddModel>('globalProduct',{

    id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING,

    mrp:INTEGER,
    qrCode:Sequelize.STRING,
    barCode:Sequelize.STRING,
    image:Sequelize.ARRAY(STRING),
    source:Sequelize.STRING

},{
    createdAt:true,
    updatedAt:true,
})