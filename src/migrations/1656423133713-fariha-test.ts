import {MigrationInterface, QueryRunner} from "typeorm";

export class farihaTest1656423133713 implements MigrationInterface {
    name = 'farihaTest1656423133713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`fariha\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`fariha\``);
    }

}
