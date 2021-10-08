
import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'
import { ProductGlobalModel } from '../models/product.model'


export const ProductGlobalRule = {
    forRegister: [
        check("name",'Name is Required').notEmpty()
    ],
    forProductList:[

    ],
    fetchAllProduct:[
        check('offset',"Please pass offset").notEmpty()
    ]

}