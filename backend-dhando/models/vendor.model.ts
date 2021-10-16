
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
    shopCategory?:string,
    vendorCode?:string,
    shopContactNumber?:String,
    shopGstnNumber?:String,
    shopAddress?:String
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
    productIds!:{
        type:ARRAY(JSONB)
    },
    vendorCode:STRING,
    shopName:STRING,
    shopCategory:STRING,
    shopAddress:STRING,
    shopContactNumber:STRING,
    shopGstnNumber:STRING,
},{
    createdAt:true,
    updatedAt:true
})

