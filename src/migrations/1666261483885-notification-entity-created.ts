import {MigrationInterface, QueryRunner} from "typeorm";

export class notificationEntityCreated1666261483885 implements MigrationInterface {
    name = 'notificationEntityCreated1666261483885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`notification_time\` datetime NOT NULL, \`type\` enum ('check_in', 'check_out') NOT NULL DEFAULT 'check_in', \`employee_number\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
