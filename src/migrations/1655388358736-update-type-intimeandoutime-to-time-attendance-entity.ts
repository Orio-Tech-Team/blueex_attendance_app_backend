import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTypeIntimeandoutimeToTimeAttendanceEntity1655388358736 implements MigrationInterface {
    name = 'updateTypeIntimeandoutimeToTimeAttendanceEntity1655388358736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`intime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`intime\` time NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`outtime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`outtime\` time NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`outtime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`outtime\` varchar(4) NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`intime\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`intime\` varchar(4) NOT NULL`);
    }

}
