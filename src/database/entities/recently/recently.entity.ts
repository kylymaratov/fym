// import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
// import { UserEntity } from '../user/user.entity';
// import { SongEntity } from '../song/song.entity';

// @Entity('recently_played')
// export class RecentlyPlayedEntity {
//   @PrimaryColumn()
//   id: number;

//   @ManyToOne(() => UserEntity, (user) => user.recently_played)
//   user: UserEntity;

//   @ManyToOne(() => SongEntity, (song) => song.recently_played)
//   song: SongEntity;

//   @CreateDateColumn()
//   playedAt: Date;
// }
