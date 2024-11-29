"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePlaylistPrimaryColumn1732386998791 = void 0;
class ChangePlaylistPrimaryColumn1732386998791 {
    constructor() {
        this.name = 'ChangePlaylistPrimaryColumn1732386998791';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "playlists_songs_songs" ("playlistsPlaylistId" uuid NOT NULL, "songsId" integer NOT NULL, "songsSongId" character varying NOT NULL, CONSTRAINT "PK_73a21111ca3ec5e562562161a3a" PRIMARY KEY ("playlistsPlaylistId", "songsId", "songsSongId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a41e85f54b63e499c848dc6971" ON "playlists_songs_songs" ("playlistsPlaylistId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5d6ffc8d15966fed209b651b7" ON "playlists_songs_songs" ("songsId", "songsSongId") `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_sub_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_sub_id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "playlists_songs_songs" ADD CONSTRAINT "FK_a41e85f54b63e499c848dc6971c" FOREIGN KEY ("playlistsPlaylistId") REFERENCES "playlists"("playlist_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlists_songs_songs" ADD CONSTRAINT "FK_e5d6ffc8d15966fed209b651b7b" FOREIGN KEY ("songsId", "songsSongId") REFERENCES "songs"("id","song_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "playlists_songs_songs" DROP CONSTRAINT "FK_e5d6ffc8d15966fed209b651b7b"`);
        await queryRunner.query(`ALTER TABLE "playlists_songs_songs" DROP CONSTRAINT "FK_a41e85f54b63e499c848dc6971c"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_sub_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_sub_id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5d6ffc8d15966fed209b651b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a41e85f54b63e499c848dc6971"`);
        await queryRunner.query(`DROP TABLE "playlists_songs_songs"`);
    }
}
exports.ChangePlaylistPrimaryColumn1732386998791 = ChangePlaylistPrimaryColumn1732386998791;
//# sourceMappingURL=1732386998791-ChangePlaylistPrimaryColumn.js.map