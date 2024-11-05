import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730806262102 implements MigrationInterface {
    name = 'Init1730806262102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "userInfoId" integer, CONSTRAINT "REL_e43569535ff044bc1626bbeb7f" UNIQUE ("userInfoId"), CONSTRAINT "PK_e752aee509d8f8118c6e5b1d8cc" PRIMARY KEY ("id", "email"))`);
        await queryRunner.query(`CREATE TABLE "user_info_entity" ("id" SERIAL NOT NULL, "favorites" text array NOT NULL DEFAULT '{}', CONSTRAINT "PK_c5ac89deb9897b077ec164c2627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song_metadata" ("id" SERIAL NOT NULL, "file_id" character varying NOT NULL, "file_unique_id" character varying NOT NULL, "duration" integer NOT NULL, "performer" character varying, "title" character varying, "file_name" character varying, "mime_type" character varying, "file_size" integer, "thumbnail" json, CONSTRAINT "PK_ed1af2ed8ea2b55769a3efac220" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "sourceId" character varying NOT NULL, "original_title" character varying NOT NULL, "title" character varying, "author" character varying, "artist" character varying, "duration" integer NOT NULL, "is_official" boolean NOT NULL, "upload_date" TIMESTAMP, "is_downloading" boolean NOT NULL DEFAULT false, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "cacheId" integer, "metadataId" integer, CONSTRAINT "REL_4d6288f351a756877c586d3c0f" UNIQUE ("cacheId"), CONSTRAINT "REL_807788dcf1dc121e63e15e8d98" UNIQUE ("metadataId"), CONSTRAINT "PK_e3cd4fa81aeab95503b0948fd56" PRIMARY KEY ("id", "sourceId"))`);
        await queryRunner.query(`CREATE TABLE "songs_caches" ("id" SERIAL NOT NULL, "buffer" bytea NOT NULL, "last_accessed" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_81b0279ff93c3ac5e1c56a21458" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9" FOREIGN KEY ("userInfoId") REFERENCES "user_info_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_4d6288f351a756877c586d3c0f5" FOREIGN KEY ("cacheId") REFERENCES "songs_caches"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_807788dcf1dc121e63e15e8d98f" FOREIGN KEY ("metadataId") REFERENCES "song_metadata"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_807788dcf1dc121e63e15e8d98f"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_4d6288f351a756877c586d3c0f5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9"`);
        await queryRunner.query(`DROP TABLE "songs_caches"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "song_metadata"`);
        await queryRunner.query(`DROP TABLE "user_info_entity"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
