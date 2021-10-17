import * as Sequelize from 'sequelize'
import {sequelize}  from '../db/config'
import {DATE, ENUM, FLOAT, INTEGER, NUMBER, STRING} from "sequelize";

export enum offerEnum {
    'product' = 'product',
    'category' = 'category'
}
export enum offerTypeEnum {
    'percentage' = 'percentage',
    'price' = 'price'
}

export interface OfferBaseModel {
    id?:number,
    name:string,
    type:offerEnum,
    offerOnId:number,
    offerType : offerTypeEnum
    expiryDate : string
}
export interface OfferViewModel {
    id?:number
}

export interface OfferModel extends Sequelize.Model<OfferViewModel,OfferBaseModel>{
    id?: number;
    name:string;
    type:offerEnum;
    offerOnId:number;
    offerType : offerTypeEnum;
    expiryDate : string
}


export const Category = sequelize.define<OfferModel,OfferBaseModel>('offers',{
    id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:STRING,
        unique:true
    },
    offerOnId:NUMBER,
    offerType:{
        type:ENUM('product','category'),
        validate:{
            isIn:[['product','category']]
        },
    },
    type:{
        type:ENUM('percentage','price'),
        validate:{
            isIn:[['percentage','price']]
        }
    },
    expiryDate:{
        type:DATE
    }
    
},{
    createdAt:true,
    updatedAt:true,
});