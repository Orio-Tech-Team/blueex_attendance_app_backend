import {MigrationInterface, QueryRunner} from "typeorm";

export class department1672748078615 implements MigrationInterface {
    name = 'department1672748078615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employee_department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`department_code\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_designation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`designation_code\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stations\` ADD \`zone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`designations\` CHANGE \`designation_count\` \`designation_count\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`designations\` CHANGE \`work_code\` \`work_code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employee_department\` ADD CONSTRAINT \`FK_a40a9c206fb114802be489fbabc\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_department\` ADD CONSTRAINT \`FK_7acde1519a95f233ba45a5260e9\` FOREIGN KEY (\`department_code\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_designation\` ADD CONSTRAINT \`FK_7b6f742dd64bfc0b1ebd01ed2e6\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_designation\` ADD CONSTRAINT \`FK_316a03edf3a58287224c0e30bfe\` FOREIGN KEY (\`designation_code\`) REFERENCES \`designations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_designation\` DROP FOREIGN KEY \`FK_316a03edf3a58287224c0e30bfe\``);
        await queryRunner.query(`ALTER TABLE \`employee_designation\` DROP FOREIGN KEY \`FK_7b6f742dd64bfc0b1ebd01ed2e6\``);
        await queryRunner.query(`ALTER TABLE \`employee_department\` DROP FOREIGN KEY \`FK_7acde1519a95f233ba45a5260e9\``);
        await queryRunner.query(`ALTER TABLE \`employee_department\` DROP FOREIGN KEY \`FK_a40a9c206fb114802be489fbabc\``);
        await queryRunner.query(`ALTER TABLE \`designations\` CHANGE \`work_code\` \`work_code\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`designations\` CHANGE \`designation_count\` \`designation_count\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`stations\` DROP COLUMN \`zone\``);
        await queryRunner.query(`DROP TABLE \`employee_designation\``);
        await queryRunner.query(`DROP TABLE \`employee_department\``);
    }

}
