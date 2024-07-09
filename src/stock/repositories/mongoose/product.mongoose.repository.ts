import { IProduct } from 'src/stock/schemas/models/product.interface'
import { ProductRepository } from '../product.repository'
import { Product } from 'src/stock/schemas/product.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

export class ProductMongooseRepository implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAllStock(limit: number, page: number): Promise<IProduct[]> {
    const offset = ((page - 1) * limit) | 0
    return this.productModel.find().skip(offset).limit(limit).exec()
  }
  async getStock(productId: string): Promise<IProduct> {
    return this.productModel.findById({ _id: productId }).exec()
  }
  async createStock(product: IProduct): Promise<void> {
    const createStock = new this.productModel(product)
    await createStock.save()
  }
  async updateStock(productId: string, stock: number): Promise<void> {
    await this.productModel
      .updateOne({ _id: productId }, { quantity: stock })
      .exec()
  }
  async deleteStock(productId: string): Promise<void> {
    await this.productModel.deleteOne({ _id: productId }).exec()
  }
}
