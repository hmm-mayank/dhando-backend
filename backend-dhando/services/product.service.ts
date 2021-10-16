import {ProductGlobalModel, Product, ProductAddModel, productModal} from '../models/product.model';
import {User, UserViewModel} from "../models/user.model";
import * as Bluebird from 'Bluebird'
import {ValidationError} from "sequelize";
export class ProductService {
    static get productAttributes() {
        return ['id','name','mrp']
    }

    private static _product
    static get product() {
        return ProductService._product
    }
    async register({name, qrCode, barCode, mrp, source, image, weight, unit, quantity}: ProductAddModel) {


        let productItem = await Product.build({
            name,
            qrCode,
            barCode,
            mrp,
            source,
            image,
            weight,
            unit,
            quantity 
        })
        try {
          await productItem.validate()
          let getProduct = await Product.findOne({where:{barCode : barCode}})
          if (getProduct){
              return getProduct
          }
          else 
           return  productItem.save().then(u => this.getProductById(u!.id));

        }catch(e){
            if (e instanceof  ValidationError){
                let message=[];
                e.errors.map(e=> {
                   message.push({message: e.message+" Options should be one of "+e.validatorArgs})
                })
                return {status:202,message};
            }

        }

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
    getProductByBarCode(id: string) {
        return Product.findOne({where:{barCode:id}}) as Bluebird<ProductGlobalModel>
    }
}