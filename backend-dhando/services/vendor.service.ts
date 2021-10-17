import {Vendor, VendorModel, VendorViewModel} from '../models/vendor.model';
import * as Sequelize from 'sequelize'
import {response} from "express";
import * as _ from "lodash"
export class VendorService {

    static get vendorAttributes() {
        return ['id','shopName','shopCategory','productIds',"shopGstnNumber","shopAddress","shopContactNumber"]
    }

    addVendorProduct({shopName,productIds,userId,vendorId,vendorCode,shopAddress,shopCategory,shopGstnNumber,shopContactNumber}:VendorModel){

        /**
         * If Vendor Exists it will append the Product Array Else it will Create New One
         */
        return Vendor.findOne({where:{'vendorId':vendorId}}).then((reponse:VendorModel)=>{
            if (reponse){
              return  Vendor.update({productIds:_.uniqBy([...reponse.productIds,...productIds],"id") },{where:{vendorId:vendorId}}).then(repon=> Vendor.findOne({where:{'userId':userId}}))
            }
            else {
                vendorCode = (Math.floor(100000 + Math.random() * 900000)).toString(); // vendor Code while Login
                return Vendor.create({shopName,productIds,userId,vendorId,vendorCode,shopAddress,shopCategory,shopGstnNumber,shopContactNumber}).then(vendor => this.getProductById(vendor!.id))
            }

        })
        // return Vendor.create({shopName,productIds,userId}).then(vendor => this.getProductById(vendor!.id))
    }
    async getProductById(id: number) {
        return await Vendor.findOne({where:{id:id},
            attributes: VendorService.vendorAttributes
        }) 
    }

     getProductFromId({vendorId}: VendorViewModel) {
        return  vendorId ? Vendor.findOne({
            where: {vendorId}
        }) : Vendor.findAll()
    }
}