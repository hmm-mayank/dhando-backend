import * as Sequelize from 'sequelize'
import {sequelize}  from '../db/config'
import {ENUM, FLOAT, INTEGER, STRING} from "sequelize";

export enum units {
    'GRAM' = 'g',
    'KG' = 'kg',
    'QUANTITY' = 'q',
    'LITER' = 'l',
    'ML' = 'ml',
    'mg' = 'mg'
}

export interface ProductGlobalModel {
    id?:number
    name:string
    image?:[string]
    mrp:number
    qrCode?:string
    barCode?:string
    unit?:units,
    weight?:Number,
    quantity?:Number,
    source:string
}
export interface ProductAddModel {
    id?:number
    name:string
    image?:[string]
    mrp:number
    qrCode?:string
    barCode?:string
    unit?:units,
    weight?:Number,
    quantity?:Number,
    source:string
}


export interface productModal extends Sequelize.Model<productModal,ProductAddModel>{
    id: number
    name:string
    image?:[string]
    mrp:number
    unit:units,
    weight?:Number,
    quantity?:Number,
    qrCode?:string
    barCode?:string
    source:string
}

/**
 *
 */
export const Product = sequelize.define<productModal,ProductAddModel>('globalProduct',{

    id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING,

    mrp:FLOAT,
    qrCode:Sequelize.STRING,
    barCode:Sequelize.STRING,
    image:Sequelize.ARRAY(STRING),
    source:Sequelize.STRING,
    unit:{
        type:ENUM('kg','g','ml','lit','q','gm'),
        validate:{
            isIn:[['kg','g','ml','lit','q','gm']]
        }
    },
    weight:FLOAT,
    quantity:INTEGER

},{
    createdAt:true,
    updatedAt:true,
})