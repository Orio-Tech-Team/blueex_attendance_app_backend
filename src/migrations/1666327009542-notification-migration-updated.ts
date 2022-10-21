import {MigrationInterface, QueryRunner} from "typeorm";

export class notificationMigrationUpdated1666327009542 implements MigrationInterface {
    name = 'notificationMigrationUpdated1666327009542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`notification_time\` datetime NOT NULL, \`type\` enum ('check_in', 'check_out') NOT NULL DEFAULT 'check_in', \`employee_number\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_3b5b90ec226388e209cd3d46d08\` FOREIGN KEY (\`employee_number\`) REFERENCES \`employees\`(\`employee_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_3b5b90ec226388e209cd3d46d08\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
