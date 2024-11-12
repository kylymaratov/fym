import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_info')
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  about: string;

  @OneToOne(() => UserEntity, (user) => user.user_info)
  user: UserEntity;
}
