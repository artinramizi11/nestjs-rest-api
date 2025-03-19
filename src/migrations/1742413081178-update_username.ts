import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsername1742413081178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "fullname" to "username"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TALBE "user" RENAME COLUMN "username" to "fullname `)
    }

}
