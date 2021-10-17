import * as Sequelize from 'sequelize'
import {sequelize}  from '../db/config'
import {ENUM, FLOAT, INTEGER, NUMBER, STRING} from "sequelize";

export interface ProductCategoryModel {
    id?:number,
    name:string
}
export interface ProductViewCategoryModel {
    id?:number;
    name:string;
}

export interface CategoryModel extends Sequelize.Model<ProductViewCategoryModel,ProductCategoryModel>{
    id?: number;
    name:string;
}


export const Category = sequelize.define<CategoryModel,ProductCategoryModel>('productCategory',{
    id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:STRING,
        unique:true
    }
    
},{
    createdAt:true,
    updatedAt:true,
});