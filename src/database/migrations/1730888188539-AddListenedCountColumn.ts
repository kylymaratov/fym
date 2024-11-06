import { MigrationInterface, QueryRunner } from "typeorm";

export class AddListenedCountColumn1730888188539 implements MigrationInterface {
    name = 'AddListenedCountColumn1730888188539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" ADD "listened_count" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "listened_count"`);
    }

}
