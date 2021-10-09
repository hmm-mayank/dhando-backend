import { Router } from 'express'
import { validationResult } from 'express-validator/check'
import {VendorService} from "../services/vendor.service";
import {vendorRules} from "../rules/vendor.rules";
import {VendorModel} from "../models/vendor.model";


export const vendorRouter = Router();
const vendorService = new VendorService(); // creating reference for Class

vendorRouter.post('/addVendorProduct',vendorRules["vendorProductList"],(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(422).json(errors.array());

    const payload = req.body as VendorModel
    const product = vendorService.addVendorProduct(payload)
    return product.then(u => res.json(u))
})