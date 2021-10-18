import { Router } from 'express'
import { id } from 'fp-ts/lib/Refinement';
import { OfferBaseModel,OfferModel } from "../models/offer.model";
import { OfferService } from '../services/offer.service';


export const OfferRoutes = Router();

const categoryService =  new OfferService();

OfferRoutes.post('/register',(req,res)=> {

    const payLoad = req.body as OfferBaseModel;
    const offerAdd = categoryService.addOffer(payLoad)
    return offerAdd.then(b => {
        return res.status( 200).json(b)
    }).catch(e=> {
        return res.status( 500).json(e)
    })
})

// OfferRoutes.put('/update',(req,res)=> {

//     const payLoad = req.body as OfferBaseModel;
//     const categoryUpdate = categoryService.up(payLoad)
//     return categoryUpdate.then(b => {
//         return res.status( 200).json(b)
//     }).catch(e=> {
//         return res.status( 500).json(e)
//     })
// })

OfferRoutes.get('/getall',(req,res)=> {

    const allOffer = categoryService.getAllOffer()
    return allOffer.then(b => {
        return res.status( 200).json(b)
    }).catch(e=> {
        return res.status( 500).json(e)
    })
})

OfferRoutes.post('/getVendorOffer',(req,res)=> {


    const payLoad = req.body as {vendorId:number};
    const offerOnVendor = categoryService.getOfferByVendorId(payLoad)
    return offerOnVendor.then(b => {
        return res.status( 200).json(b)
    }).catch(e=> {
        return res.status( 500).json(e)
    })
})