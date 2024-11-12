import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSongSourceIdName1730971597793 implements MigrationInterface {
    name = 'ChangeSongSourceIdName1730971597793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" RENAME COLUMN "sourceId" TO "source_id"`);
        await queryRunner.query(`ALTER TABLE "songs" RENAME CONSTRAINT "PK_e3cd4fa81aeab95503b0948fd56" TO "PK_74890899ae8d7a6fecd41bed2e2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" RENAME CONSTRAINT "PK_74890899ae8d7a6fecd41bed2e2" TO "PK_e3cd4fa81aeab95503b0948fd56"`);
        await queryRunner.query(`ALTER TABLE "songs" RENAME COLUMN "source_id" TO "sourceId"`);
    }

}
