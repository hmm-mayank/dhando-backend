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
    offerType : offerTypeEnum,
    expiryDate : string,
    value:Number;
    vendorId:number
}
export interface OfferViewModel {
    id?:number,
    vendorId?:number
}

export interface OfferModel extends Sequelize.Model<OfferViewModel,OfferBaseModel>{
    id?: number;
    name:string;
    type:offerEnum;
    value:Number;
    offerOnId:number;
    offerType : offerTypeEnum;
    expiryDate : string
    vendorId:number
}


export const Offer = sequelize.define<OfferModel,OfferBaseModel>('offers',{
    id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    vendorId:{
        type:INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        
        }
    },
    name:{
        type:STRING,
        unique:true,
        allowNull:false,
        validate:{
            notEmpty:true
        
        }
        
    },
    offerOnId:INTEGER,
    offerType:{
        type:ENUM('product','category'),
        allowNull:false,
        validate:{
            isIn:[['product','category']]
        },
    },
    type:{
        type:ENUM('percentage','price'),
        allowNull:false,
        validate:{
            isIn:[['percentage','price']]
        }
    },
    expiryDate:{
        type:DATE
    },
    value:{
        type:INTEGER,
        allowNull:false
    }
    
},{
    createdAt:true,
    updatedAt:true,
});