import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1742411896845 implements MigrationInterface {
    name = 'NewMigration1742411896845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

}
