import {ProductGlobalModel, Product, ProductAddModel, productModal} from '../models/product.model';
import {User, UserViewModel} from "../models/user.model";
import * as Bluebird from 'Bluebird'
export class ProductService {
    static get productAttributes() {
        return ['id','name','mrp']
    }

    private static _product
    static get product() {
        return ProductService._product
    }
    register({name,qrCode,barCode,mrp,source,image}:ProductAddModel ){
        console.log(name)
        return Product.create({name,qrCode,barCode,mrp,source,image}) .then(u => this.getProductById(u!.id))
    }

    get({name,id,barCode,qrCode}:productModal) {

       if(name)   return Product.findOne({where: { name }})
        if(id)   return Product.findOne({where: { id }})
        if(barCode)   return Product.findOne({where: { barCode }})
        if(qrCode)   return Product.findOne({where: { qrCode }})
    }
    getAll({offset}) {
        return Product.findAll({limit:10,offset:offset})
    }

    getProductById(id: number) {
        return Product.findByPk(id, {
            attributes: ProductService.productAttributes
        }) as Bluebird<ProductGlobalModel>
    }
}