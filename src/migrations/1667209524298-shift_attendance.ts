import {MigrationInterface, QueryRunner} from "typeorm";

export class shiftAttendance1667209524298 implements MigrationInterface {
    name = 'shiftAttendance1667209524298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_e1dfaaa63e801bd069d9cf60173\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`notification_id\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`shift\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`shift_attendance\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_e9501577e10ba36a35fc5a56069\` FOREIGN KEY (\`shift_attendance\`) REFERENCES \`shifts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_3b5b90ec226388e209cd3d46d08\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_3b5b90ec226388e209cd3d46d08\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_e9501577e10ba36a35fc5a56069\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`shift_attendance\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`shift\``);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`notification_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_e1dfaaa63e801bd069d9cf60173\` FOREIGN KEY (\`notification_id\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
