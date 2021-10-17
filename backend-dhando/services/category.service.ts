import {
  Category,
  ProductCategoryModel,
  ProductViewCategoryModel,
} from "../models/productCategory.model";

export class CategoryService {
  static get categoryAttribute() {
    return ["id", "name"];
  }

  addCategory({ name }: ProductCategoryModel) {
    if (name)
      return Category.create({ name }).then((cat) =>
        this.getCategoryById(cat!.id)
      );
  }

  async getCategoryById(id: number) {
    return await Category.findOne({
      where: { id: id },
      attributes: CategoryService.categoryAttribute,
    });
  }
  async getAllCategory() {
    return await Category.findAll();
  }
  async updateCategory({id, name}: ProductCategoryModel) {
    return await Category.update({ name: name }, { where: { id: id } });
  }
}
