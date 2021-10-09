import {Billing, BillingModel, BillingViewModel, IScannedProduct} from "../models/billing.model";
import {Vendor, VendorModel, VendorViewModel} from "../models/vendor.model";
import * as Bluebird from 'Bluebird';
import {ValidationError} from "sequelize";
import {VendorService} from "./vendor.service";
import {Product, ProductGlobalModel} from "../models/product.model";


export class BillingService {

    static get billingAttributes() {
        return ['customerPhone','cartProduct','id','customer','cartProduct','vendorId']
    }
    private static _billing
    static get billing() {
        return BillingService._billing
    }
    async createBill({cashierId, customer, customerPhone, id, cartProduct, vendorId}: BillingModel) {

        let billingItem = await Billing.build(
            {cashierId, customer, customerPhone, id, cartProduct, vendorId}
        )

        try {
            await billingItem.validate();
            return billingItem.save().then(billId => this.getBillingById(billId!.id))
        }catch (e){
            if (e instanceof  ValidationError){
                let message=[];
                e.errors.map(e=> {
                    message.push({message: e.message+" Options should be one of "+e.validatorArgs})
                })
                return {status:202,message};
            }
        }

    }
    getBillingById(id: number) {
        return Billing.findOne({where:{id:id},
            attributes: BillingService.billingAttributes
        }) as Bluebird<BillingViewModel>
    }

    getScannedProductDetail ({vendorId,qrCodeId,barCodeId}:IScannedProduct) {
        try {
            // @ts-ignore
            return Product.findOne({where:{barCode:barCodeId}}).then((searchProduct)=>{
                if (searchProduct.id){
                 return Vendor.findOne({where:{vendorId: vendorId}}).then((vendorProducts:VendorModel)=>{

                        let elements =   vendorProducts.productIds.filter((element)=> element.id === searchProduct.id)
                     delete searchProduct["dataValues"]["mrp"]
                     return {

                            product : {...elements[0],...searchProduct["dataValues"]},
                            total:elements.length
                     }
                    })
                }
                else {
                    return {message:"Product Not Found"}
                }

            }).catch(error=>{

                return {message:"Product Not Found"}
            })
        }
        catch (e) {
                return e;
        }

    }

    getVendorProduct ({vendorId,qrCodeId,barCodeId}:IScannedProduct) {
        try {
            // @ts-ignore
                    return Vendor.findOne({where:{vendorId: vendorId}}).then((vendorAllProducts:VendorModel)=>vendorAllProducts)
            .catch(error=>{
                console.log(error)
                return {message:"Product Not Found"}
            })
        }
        catch (e) {
            return e;
        }

    }

}