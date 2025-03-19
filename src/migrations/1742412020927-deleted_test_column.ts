import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletedTestColumn1742412020927 implements MigrationInterface {
    name = 'DeletedTestColumn1742412020927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying`);
    }

}
