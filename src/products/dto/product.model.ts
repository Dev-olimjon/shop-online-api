import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ProductsDto } from './product.dto'
@Table({ tableName: 'Products' })
export class Products extends Model<ProductsDto>{
    @Column({ type: DataType.TEXT, unique: true, primaryKey: true }) id: string
    @Column({ type: DataType.TEXT, allowNull: false }) madel: string
    @Column({ type: DataType.TEXT, allowNull: false }) color: string
    @Column({ type: DataType.TEXT, allowNull: false }) describtion: string
    @Column({ type: DataType.TEXT, allowNull: false }) brand: string
    @Column({ type: DataType.TEXT, allowNull: false }) type: string
    @Column({ type: DataType.TEXT, allowNull: false }) price: string
    @Column({ type: DataType.TEXT, allowNull: false }) image: string
}