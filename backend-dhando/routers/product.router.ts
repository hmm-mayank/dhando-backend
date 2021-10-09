
import { Router } from 'express'
import { validationResult } from 'express-validator/check'
import { ProductService } from '../services/product.service'
import { ProductGlobalModel,productModal} from '../models/product.model'
import { ProductGlobalRule } from "../rules/product.rules";


export const productRouter = Router();
const productService = new ProductService()

productRouter.post('/register',ProductGlobalRule["forRegister"],(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())

    const payload = req.body as ProductGlobalModel
    const product = productService.register(payload)
    return product.then(u => {
        return  res.status(u?.status || 200).json(u)
    })
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