import { Router } from 'express'
import { ProductCategoryModel, ProductViewCategoryModel } from "../models/productCategory.model";
import { CategoryService } from '../services/category.service';


export const categoryRouter = Router();

const categoryService =  new CategoryService();

categoryRouter.post('/register',(req,res)=> {

    const payLoad = req.body as ProductCategoryModel;
    const cateoryAdd = categoryService.addCategory(payLoad)
    return cateoryAdd.then(b => {
        return res.status( 200).json(b)
    }).catch(e=> {
        return res.status( 500).json(e)
    })
})

categoryRouter.put('/update',(req,res)=> {

    const payLoad = req.body as ProductCategoryModel;
    const categoryUpdate = categoryService.updateCategory(payLoad)
    return categoryUpdate.then(b => {
        return res.status( 200).json(b)
    }).catch(e=> {
        return res.status( 500).json(e)
    })
})

categoryRouter.get('/getall',(req,res)=> {

    const allCategory = categoryService.getAllCategory()
    return allCategory.then(b => {
        return res.status( 200).json(b)
    }).catch(e=> {
        return res.status( 500).json(e)
    })
})