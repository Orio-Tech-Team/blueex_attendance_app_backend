import {MigrationInterface, QueryRunner} from "typeorm";

export class addTypeAttendanceEntity1655305319416 implements MigrationInterface {
    name = 'addTypeAttendanceEntity1655305319416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`type\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`type\``);
    }

}
