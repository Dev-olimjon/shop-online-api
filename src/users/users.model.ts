import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { userDto } from './dto/users.dto';
@Table({ tableName: 'Users' })
export class User extends Model<userDto> {
      @Column({ type: DataType.TEXT, unique: true, primaryKey: true })
      id: string;
      @Column({ type: DataType.TEXT, allowNull: false })
      name: string;
      @Column({ type: DataType.TEXT, allowNull: false })
      surname: string;
      @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
      number: number;
      @Column({ type: DataType.TEXT, allowNull: false })
      password: string
      @Column({ type: DataType.TEXT, allowNull: false, defaultValue: 'USER' })
      role: string
      @Column({ type: DataType.TEXT, allowNull: false })
      birthday: string;
      @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
      banned: boolean;
      @Column({ type: DataType.TEXT, allowNull: false })
      country: string
}