import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ChangePlaylistPrimaryColumn1732386998791 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
