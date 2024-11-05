import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true, default: [] })
  favorites: string[];

  @OneToOne(() => UserEntity, (user) => user.user_info)
  user: UserEntity;
}
