import {
  OfferBaseModel,
  OfferModel,
  OfferViewModel,
  Offer,
} from "../models/offer.model";

export class OfferService {
  static get offerAttributes() {
    return ["name", "type", "offerOnId", "offerType", "expiryDate", "vendorId",'value'];
  }

  addOffer({
    name,
    type,
    expiryDate,
    offerOnId,
    offerType,
    vendorId,value
  }: OfferBaseModel) {
    return Offer.create({
      name,
      type,
      expiryDate,
      offerOnId,
      offerType,
      vendorId,
      value
    })
      .then((offer) => this.getOfferById(offer!.id))
      .catch((e) => e);
  }

  async getOfferById(id: number) {
    return await Offer.findOne({
      where: { id: id },
      attributes: OfferService.offerAttributes,
    });
  }

  async getOfferByVendorId({vendorId}: {vendorId:number}) {
    return await Offer.findAll({
      where: { vendorId: vendorId },
      attributes: OfferService.offerAttributes,
    });
  }

  async getAllOffer() {
    return await Offer.findAll({
      attributes: OfferService.offerAttributes,
    });
  }
}
