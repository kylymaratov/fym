import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_info')
export class UserInfoEntity {
  @PrimaryColumn({ unique: true, nullable: false })
  user_sub_id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  about: string;

  @OneToOne(() => UserEntity, (user) => user.user_info)
  user: UserEntity;
}
