import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLikesToSong1730823009267 implements MigrationInterface {
    name = 'AddLikesToSong1730823009267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song_likes" ("id" SERIAL NOT NULL, "userId" integer, "userEmail" character varying, "songId" integer, "songSourceId" character varying, CONSTRAINT "PK_ab6831400eb081ebb6cbc2cb2b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "song_likes" ADD CONSTRAINT "FK_8168b2dc1a2f1b25ca9126955b3" FOREIGN KEY ("userId", "userEmail") REFERENCES "users"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song_likes" ADD CONSTRAINT "FK_3aa1a4bf0341eed2b7fb2b04a71" FOREIGN KEY ("songId", "songSourceId") REFERENCES "songs"("id","sourceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_likes" DROP CONSTRAINT "FK_3aa1a4bf0341eed2b7fb2b04a71"`);
        await queryRunner.query(`ALTER TABLE "song_likes" DROP CONSTRAINT "FK_8168b2dc1a2f1b25ca9126955b3"`);
        await queryRunner.query(`DROP TABLE "song_likes"`);
    }

}
