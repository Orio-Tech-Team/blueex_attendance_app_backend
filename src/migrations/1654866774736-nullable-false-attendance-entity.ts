import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableFalseAttendanceEntity1654866774736 implements MigrationInterface {
    name = 'nullableFalseAttendanceEntity1654866774736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` CHANGE \`outtime\` \`outtime\` varchar(4) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` CHANGE \`outtime\` \`outtime\` varchar(4) NOT NULL`);
    }

}
