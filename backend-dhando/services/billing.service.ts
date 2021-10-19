import {Billing, BillingModel, BillingViewModel, IScannedProduct} from "../models/billing.model";
import {Vendor, VendorModel, VendorViewModel} from "../models/vendor.model";
import {ValidationError} from "sequelize";
import {VendorService} from "./vendor.service";
import {Product, ProductGlobalModel} from "../models/product.model";
import { AWSURI, CallApi,billInvoice } from "../utils/callApi";

const callApi = new CallApi();
export class BillingService {

    static get billingAttributes() {
        return ['customerPhone','cartProduct','id','customer','cartProduct','vendorId','invoicePath']
    }
    private static _billing
    static get billing() {
        return BillingService._billing
    }
    async createBill({cashierId, customer, customerPhone, id, cartProduct, vendorId,invoicePath}: BillingModel) {


        let billingItem = await Billing.build(
            {cashierId, customer, customerPhone, id, cartProduct, vendorId,invoicePath}
        )

        try {
            await billingItem.validate();
            return billingItem.save().then(async billId =>{
                let phone  = customer.phone;
                let name = customer.name;
                // let message= await billInvoice(name,invoicePath)
                // callApi.sendMessage({message, phone})
                return this.getBillingById(billId!.id)
                })
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
    async getBillingById(id: number) {
        return await Billing.findOne({where:{id:id},
            attributes: BillingService.billingAttributes
        }) 
    }

    getScannedProductDetail ({vendorId,qrCodeId,barCodeId}:IScannedProduct) {
        try {
            // @ts-ignore
            return Product.findOne({where:{barCode:barCodeId}}).then((searchProduct)=>{
                if (searchProduct.id){    
                 return Vendor.findOne({where:{vendorId: vendorId}}).then((vendorProducts:VendorModel)=>{
                   
                        if(vendorProducts.productIds.length >= 1){
                            console.log(searchProduct.id,"GET USER PRIDC");
                            let elements =   vendorProducts.productIds.filter((element)=> (element.id === searchProduct.id))
                            console.log(elements,"GER ");
                            delete searchProduct["dataValues"]["mrp"]
                            return {
       
                                   product : {...elements[0],...searchProduct["dataValues"]},
                                   total:elements.length
                            }
                        }
                       else return {message:"Product Not Found"}
                       
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


    getVendorBills({vendorId}) {
        try {

            return Billing.findAll({where:{vendorId}})
            
        } catch (error) {
            
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

/**
 * 
 * @param userName | User name who does Shopping
 * @param vendorName | Vendor Name
 * @param awsInvoice | invoice URL
 * @returns 
 */
