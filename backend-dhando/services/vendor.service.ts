import {Vendor, VendorModel, VendorViewModel} from '../models/vendor.model';
import * as Bluebird from 'Bluebird';
import * as Sequelize from 'sequelize'
import {response} from "express";
import * as _ from "lodash"
export class VendorService {

    static get vendorAttributes() {
        return ['id','shopName','shopCategory','productIds']
    }

    addVendorProduct({shopName,productIds,userId,vendorId}:VendorModel){

        /**
         * If Vendor Exists it will append the Product Array Else it will Create New One
         */
        return Vendor.findOne({where:{'vendorId':vendorId}}).then((reponse:VendorModel)=>{
            if (reponse){
              return  Vendor.update({productIds:_.uniqBy([...reponse.productIds,...productIds],"id") },{where:{vendorId:vendorId}}).then(repon=> Vendor.findOne({where:{'userId':userId}}))
            }
            else {
                return Vendor.create({shopName,productIds,userId,vendorId}).then(vendor => this.getProductById(vendor!.id))
            }

        })
        // return Vendor.create({shopName,productIds,userId}).then(vendor => this.getProductById(vendor!.id))
    }
    getProductById(id: number) {
        return Vendor.findOne({where:{id:id},
            attributes: VendorService.vendorAttributes
        }) as Bluebird<VendorModel>
    }

     getProductFromId({vendorId}: VendorViewModel) {
        return  Vendor.findOne({
            where: {vendorId}
        })
    }
}