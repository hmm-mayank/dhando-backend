import {ARRAY, INTEGER, JSONB, NUMBER, Sequelize, STRING} from "sequelize";
import {sequelize} from "../db/config";



export interface  VendorProductPrice {
    id:number,
    mrp:number,
    sp:number,
    pp:number, // purchashed Price
    sku:number,
}


export interface VendorModel {
    id?:number
    userId:number
    vendorId:number
    productIds:[VendorProductPrice]
    shopName?: string
    shopCategory?:string
}
export interface VendorViewModel {
    vendorId:number
}

export const Vendor = sequelize.define<any,VendorModel>('vendor',{
    vendorId: INTEGER,

    id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:INTEGER,
    productIds:ARRAY(JSONB),
    shopName:STRING,
    shopCategory:STRING
},{
    createdAt:true,
    updatedAt:true
})

