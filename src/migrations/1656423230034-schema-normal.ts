import {MigrationInterface, QueryRunner} from "typeorm";

export class schemaNormal1656423230034 implements MigrationInterface {
    name = 'schemaNormal1656423230034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`fariha\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`fariha\` varchar(255) NOT NULL`);
    }

}
