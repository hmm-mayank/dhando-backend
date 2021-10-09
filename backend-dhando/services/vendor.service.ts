import {Vendor,VendorModel} from '../models/vendor.model';
import * as Bluebird from 'Bluebird';

export class VendorService {

    static get vendorAttributes() {
        return ['id','shopName','shopCategory','productIds']
    }

    addVendorProduct({shopName,productIds,userId}:VendorModel){
        return Vendor.create({shopName,productIds,userId}).then(vendor => this.getProductById(vendor!.id))
    }
    getProductById(id: number) {
        return Vendor.findOne({where:{id:id},
            attributes: VendorService.vendorAttributes
        }) as Bluebird<VendorModel>
    }
}