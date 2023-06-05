import {MigrationInterface, QueryRunner} from "typeorm";

export class new1685951330653 implements MigrationInterface {
    name = 'new1685951330653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`city_code\` varchar(3) NOT NULL, \`city_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8a923e3efec13c45820d037570\` (\`city_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`station_code\` varchar(255) NOT NULL, \`station_name\` varchar(255) NOT NULL, \`latitude\` varchar(255) NOT NULL, \`longtitude\` varchar(255) NOT NULL, \`radius\` int NOT NULL, \`city_code\` varchar(255) NOT NULL, \`erp_id\` varchar(255) NOT NULL, \`zone\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9ff067d5f309a58c4392855118\` (\`station_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_stations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`station_code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shifts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`type\` varchar(2) NOT NULL, \`erp_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`notification_time\` datetime NOT NULL, \`type\` enum ('check_in', 'check_out') NOT NULL DEFAULT 'check_in', \`employee_number\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`department_name\` varchar(255) NOT NULL, \`mref\` varchar(255) NOT NULL, \`hod\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`department_code\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`designations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`designation\` varchar(255) NOT NULL, \`job_description\` varchar(255) NULL, \`designation_count\` int NOT NULL, \`work_code\` int NOT NULL, \`app\` tinyint NOT NULL DEFAULT 0, \`web\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_designation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`designation_code\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`employee_name\` varchar(255) NOT NULL, \`shift_id\` int NULL, UNIQUE INDEX \`IDX_8878710dc844ecd6f9e587f34f\` (\`employee_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attendance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`intime\` time NOT NULL, \`outtime\` time NULL, \`attendance_date\` date NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stations\` ADD CONSTRAINT \`FK_e19c5a341d1ae2544849dd68ec4\` FOREIGN KEY (\`city_code\`) REFERENCES \`cities\`(\`city_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` ADD CONSTRAINT \`FK_804d1503f5c3888716997fa73bd\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` ADD CONSTRAINT \`FK_7ed494c0c7eac8e8f8410e24d6a\` FOREIGN KEY (\`station_code\`) REFERENCES \`stations\`(\`station_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_3b5b90ec226388e209cd3d46d08\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_department\` ADD CONSTRAINT \`FK_a40a9c206fb114802be489fbabc\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_department\` ADD CONSTRAINT \`FK_7acde1519a95f233ba45a5260e9\` FOREIGN KEY (\`department_code\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_designation\` ADD CONSTRAINT \`FK_7b6f742dd64bfc0b1ebd01ed2e6\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_designation\` ADD CONSTRAINT \`FK_316a03edf3a58287224c0e30bfe\` FOREIGN KEY (\`designation_code\`) REFERENCES \`designations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_98e5075745ff16aeca79c12311c\` FOREIGN KEY (\`shift_id\`) REFERENCES \`shifts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_16d95b1807e9631d4c1705e4868\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_16d95b1807e9631d4c1705e4868\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_98e5075745ff16aeca79c12311c\``);
        await queryRunner.query(`ALTER TABLE \`employee_designation\` DROP FOREIGN KEY \`FK_316a03edf3a58287224c0e30bfe\``);
        await queryRunner.query(`ALTER TABLE \`employee_designation\` DROP FOREIGN KEY \`FK_7b6f742dd64bfc0b1ebd01ed2e6\``);
        await queryRunner.query(`ALTER TABLE \`employee_department\` DROP FOREIGN KEY \`FK_7acde1519a95f233ba45a5260e9\``);
        await queryRunner.query(`ALTER TABLE \`employee_department\` DROP FOREIGN KEY \`FK_a40a9c206fb114802be489fbabc\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_3b5b90ec226388e209cd3d46d08\``);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` DROP FOREIGN KEY \`FK_7ed494c0c7eac8e8f8410e24d6a\``);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` DROP FOREIGN KEY \`FK_804d1503f5c3888716997fa73bd\``);
        await queryRunner.query(`ALTER TABLE \`stations\` DROP FOREIGN KEY \`FK_e19c5a341d1ae2544849dd68ec4\``);
        await queryRunner.query(`DROP TABLE \`attendance\``);
        await queryRunner.query(`DROP INDEX \`IDX_8878710dc844ecd6f9e587f34f\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP TABLE \`employee_designation\``);
        await queryRunner.query(`DROP TABLE \`designations\``);
        await queryRunner.query(`DROP TABLE \`employee_department\``);
        await queryRunner.query(`DROP TABLE \`departments\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`shifts\``);
        await queryRunner.query(`DROP TABLE \`employee_stations\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ff067d5f309a58c4392855118\` ON \`stations\``);
        await queryRunner.query(`DROP TABLE \`stations\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a923e3efec13c45820d037570\` ON \`cities\``);
        await queryRunner.query(`DROP TABLE \`cities\``);
    }

}
