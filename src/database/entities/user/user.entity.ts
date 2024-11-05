import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInfoEntity } from './user.info.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @JoinColumn()
  @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.user, {
    cascade: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  user_info: UserInfoEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
