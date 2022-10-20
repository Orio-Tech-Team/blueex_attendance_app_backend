import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTypeStarttimeandendtimeToTimeShiftEntity1655390917802 implements MigrationInterface {
    name = 'updateTypeStarttimeandendtimeToTimeShiftEntity1655390917802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shifts\` DROP COLUMN \`start_time\``);
        await queryRunner.query(`ALTER TABLE \`shifts\` ADD \`start_time\` time NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shifts\` DROP COLUMN \`end_time\``);
        await queryRunner.query(`ALTER TABLE \`shifts\` ADD \`end_time\` time NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shifts\` DROP COLUMN \`end_time\``);
        await queryRunner.query(`ALTER TABLE \`shifts\` ADD \`end_time\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shifts\` DROP COLUMN \`start_time\``);
        await queryRunner.query(`ALTER TABLE \`shifts\` ADD \`start_time\` varchar(255) NOT NULL`);
    }

}
