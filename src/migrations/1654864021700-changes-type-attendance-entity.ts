import {MigrationInterface, QueryRunner} from "typeorm";

export class changesTypeAttendanceEntity1654864021700 implements MigrationInterface {
    name = 'changesTypeAttendanceEntity1654864021700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`intime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`intime\` varchar(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`outtime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`outtime\` varchar(4) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`outtime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`outtime\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`intime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`intime\` int NOT NULL`);
    }

}
