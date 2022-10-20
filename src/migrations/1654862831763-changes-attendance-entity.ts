import {MigrationInterface, QueryRunner} from "typeorm";

export class changesAttendanceEntity1654862831763 implements MigrationInterface {
    name = 'changesAttendanceEntity1654862831763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`attendace_date\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`attendance_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_16d95b1807e9631d4c1705e4868\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` CHANGE \`employee_number\` \`employee_number\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_16d95b1807e9631d4c1705e4868\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_16d95b1807e9631d4c1705e4868\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` CHANGE \`employee_number\` \`employee_number\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_16d95b1807e9631d4c1705e4868\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP COLUMN \`attendance_date\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD \`attendace_date\` datetime NOT NULL`);
    }

}
