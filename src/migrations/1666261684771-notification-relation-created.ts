import {MigrationInterface, QueryRunner} from "typeorm";

export class notificationRelationCreated1666261684771 implements MigrationInterface {
    name = 'notificationRelationCreated1666261684771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`notification_time\` datetime NOT NULL, \`type\` enum ('check_in', 'check_out') NOT NULL DEFAULT 'check_in', \`employee_number\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`notification_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_e1dfaaa63e801bd069d9cf60173\` FOREIGN KEY (\`notification_id\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_e1dfaaa63e801bd069d9cf60173\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`notification_id\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
