
import { Router } from 'express'
import { matchedData } from 'express-validator/filter'
import { validationResult } from 'express-validator/check'
import { userRules } from '../rules/user.rules'
import { ProductService } from '../services/product.service'
import {Product, ProductGlobalModel,productModal} from '../models/product.model'
import {UserAddModel} from "../models/user.model";
import {ProductGlobalRule} from "../rules/product.rules";


export const productRouter = Router();
const productService = new ProductService()

productRouter.post('/register',ProductGlobalRule["forRegister"],(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())

    const payload = req.body as ProductGlobalModel
    const product = productService.register(payload)
    return product.then(u => res.json(u))
})

productRouter.get('/productlist',ProductGlobalRule["forProductList"],(req,res)=> {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    const payload = req.body as productModal
    const product = productService.get(payload);
    return product.then(u => res.json(u))
})


productRouter.get('/getAllProduct',ProductGlobalRule["fetchAllProduct"],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    const payload = req.body as { offset:number }
    const product = productService.getAll(payload);
    return product.then(u => res.json(u))
})