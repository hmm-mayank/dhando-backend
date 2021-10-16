import { Router } from 'express'
import {BillingService} from "../services/billing.service";
import {BillingModel, IScannedProduct, scanProductInterface} from "../models/billing.model";
import  * as _ from "lodash";

import * as E from 'io-ts/Eq'
import {matchedData} from "express-validator/filter";
import {UserAddModel} from "../models/user.model";
import {keys} from "fp-ts/Map";
import Logger from '../lib/logger';




export const billingRouter = Router();
const billingService = new BillingService();


billingRouter.post('/register',async (req, res) => {
    const payLoad = req.body as BillingModel;
    const validationResult = await validateProducts(payLoad.cartProduct);
    console.log(validationResult, "ss")
    if (!validationResult) {
        return res.status(202).json({message: "Please check Product they should contain  ['productId','mrp','sp','units','barCodeId','qrCodeId','weight','weightUnit']"})
    }
    const bill = billingService.createBill(payLoad);

    return bill.then(b => {
        return res.status(b?.status || 200).json(b)
    })
})

billingRouter.post('/sc',(req,res)=>{
    const payLoad = req.body as IScannedProduct;
    console.log(JSON.stringify(payLoad));
     let pd = billingService.getScannedProductDetail(payLoad)
    return pd.then(b => {
        console.log(b)
        return res.status(200).json(b)
    })
})

billingRouter.get('/all',(req,res)=>{
    const payLoad = req.body as IScannedProduct;
    let pd = billingService.getVendorProduct(payLoad)
    return pd.then(b => {

        return res.status(200).json(b)
    })
})

billingRouter.post('/vendorOrder',(req,res)=>{
    const payLoad = req.body as BillingModel;
    let pd = billingService.getVendorBills(payLoad)
    return pd.then(b => {

        return res.status(200).json(b)
    })
})



/**
 * this function will validate the scanned object and it will return false if products are not proper
 * @param products
 */
const validateProducts  = (products:[scanProductInterface])  => {
    console.log(products);
    // @ts-ignore
    if (products.length === 0) {
        return false
    }
    let res = false;
    products.forEach((product,index)=>{
    let objectKeys = Object.keys(product);
    const toBeKeys = ['productId','productName','mrp','sp','weight','weightUnit','units']
      let differenceIs =   _.isEqual(objectKeys.sort(),toBeKeys.sort());
            if (!differenceIs) {
                res = false;
            }
            else if (products.length-1 == index && differenceIs) {
                res = true;
            }

    })
    return  res;
}

