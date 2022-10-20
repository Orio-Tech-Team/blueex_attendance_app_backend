import {MigrationInterface, QueryRunner} from "typeorm";

export class addErpColumn1664203670190 implements MigrationInterface {
    name = 'addErpColumn1664203670190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shifts\` ADD \`erp_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`stations\` ADD \`erp_id\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stations\` DROP COLUMN \`erp_id\``);
        await queryRunner.query(`ALTER TABLE \`shifts\` DROP COLUMN \`erp_id\``);
    }

}
