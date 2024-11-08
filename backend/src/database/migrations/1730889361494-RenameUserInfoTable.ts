import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserInfoTable1730889361494 implements MigrationInterface {
    name = 'RenameUserInfoTable1730889361494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9"`);
        await queryRunner.query(`CREATE TABLE "user_info" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "about" character varying, CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9" FOREIGN KEY ("userInfoId") REFERENCES "user_info"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9"`);
        await queryRunner.query(`DROP TABLE "user_info"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e43569535ff044bc1626bbeb7f9" FOREIGN KEY ("userInfoId") REFERENCES "user_info_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
