import * as Sequelize from 'sequelize'
import {sequelize}  from '../db/config'
import {ARRAY, DataTypes, ENUM, FLOAT, INTEGER, JSONB, NUMBER, STRING} from "sequelize";
import {units} from "./product.model";


export interface scanProductInterface  {
    productId:number,
    mrp:number,
    sp:number,
    units:number,
    barCodeId?:number,
    qrCodeId?:number,
    weight?:number,
    weightUnit?:units
}
export  interface scanCustomerInterface {
    email?:string,
    phone:number,
    name?:string
}
export interface BillingModel {

    id:number,
    vendorId:number,
    cashierId:number,
    customerPhone:string,
    customer:scanCustomerInterface,
    cartProduct:[scanProductInterface]
    invoicePath:string
}

 export interface BillingViewModel extends Sequelize.Model<any,BillingModel> {
    id?:number,
     customerPhone?:number,
     vendorId?:number,

 }
 export interface  IScannedProduct {
    barCodeId? :string,
     qrCodeId? : string,
     vendorId?:number
 }

 export const Billing = sequelize.define<BillingViewModel,BillingModel>('billing',{
     cartProduct: ARRAY(JSONB),
     cashierId: {
         type:INTEGER,
         allowNull:false,
         validate:{
            notEmpty:true,
             notNull:true
         }
     },
     customer: {
         type:JSONB,
         allowNull:false,
         validate:{
             notEmpty:true,
             notNull:true
         }
     },
     vendorId: {
         type:INTEGER,
         allowNull:false,
         validate:{
             notEmpty:true,
             notNull:true
         }
     },
     customerPhone: {
         type:STRING,
         allowNull:false,
         validate:{
             notEmpty:true,
             notNull:true
         }
     },
     id:{
    type:INTEGER,
    autoIncrement:true,
    primaryKey:true
},
invoicePath:STRING

},{
    createdAt:true,
        updatedAt:true,
})


