import {MigrationInterface, QueryRunner} from "typeorm";

export class citiesStationEmployeeAttendace1654805343934 implements MigrationInterface {
    name = 'citiesStationEmployeeAttendace1654805343934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attendance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`intime\` int NOT NULL, \`outtime\` int NOT NULL, \`attendace_date\` datetime NOT NULL, \`employee_number\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`employee_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8878710dc844ecd6f9e587f34f\` (\`employee_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_stations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_number\` int NOT NULL, \`station_code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`station_code\` varchar(255) NOT NULL, \`station_name\` varchar(255) NOT NULL, \`latitude\` varchar(255) NOT NULL, \`longtitude\` varchar(255) NOT NULL, \`radius\` int NOT NULL, \`city_code\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9ff067d5f309a58c4392855118\` (\`station_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`city_code\` varchar(3) NOT NULL, \`city_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8a923e3efec13c45820d037570\` (\`city_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_16d95b1807e9631d4c1705e4868\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` ADD CONSTRAINT \`FK_804d1503f5c3888716997fa73bd\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` ADD CONSTRAINT \`FK_7ed494c0c7eac8e8f8410e24d6a\` FOREIGN KEY (\`station_code\`) REFERENCES \`stations\`(\`station_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stations\` ADD CONSTRAINT \`FK_e19c5a341d1ae2544849dd68ec4\` FOREIGN KEY (\`city_code\`) REFERENCES \`cities\`(\`city_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stations\` DROP FOREIGN KEY \`FK_e19c5a341d1ae2544849dd68ec4\``);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` DROP FOREIGN KEY \`FK_7ed494c0c7eac8e8f8410e24d6a\``);
        await queryRunner.query(`ALTER TABLE \`employee_stations\` DROP FOREIGN KEY \`FK_804d1503f5c3888716997fa73bd\``);
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_16d95b1807e9631d4c1705e4868\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a923e3efec13c45820d037570\` ON \`cities\``);
        await queryRunner.query(`DROP TABLE \`cities\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ff067d5f309a58c4392855118\` ON \`stations\``);
        await queryRunner.query(`DROP TABLE \`stations\``);
        await queryRunner.query(`DROP TABLE \`employee_stations\``);
        await queryRunner.query(`DROP INDEX \`IDX_8878710dc844ecd6f9e587f34f\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP TABLE \`attendance\``);
    }

}
