import {check} from "express-validator/check";

export const vendorRules = {

    vendorProductList : [
        check('userId','User Id Required').notEmpty().isNumeric(),
        check('productIds','Product Ids Required').isArray().notEmpty()
    ]
}