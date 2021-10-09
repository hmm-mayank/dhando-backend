import {ARRAY, INTEGER, NUMBER, Sequelize, STRING} from "sequelize";
import {sequelize} from "../db/config";

export interface VendorModel {
    id?:number
    userId:number
    productIds:[string]
    shopName?: string
    shopCategory?:string
}

export const Vendor = sequelize.define<any,VendorModel>('vendor',{

    id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:INTEGER,
    productIds:ARRAY(INTEGER),
    shopName:STRING,
    shopCategory:STRING
},{
    createdAt:true,
    updatedAt:true
})

