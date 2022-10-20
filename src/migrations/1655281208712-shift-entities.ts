import {MigrationInterface, QueryRunner} from "typeorm";

export class shiftEntities1655281208712 implements MigrationInterface {
    name = 'shiftEntities1655281208712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shifts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 1, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`start_time\` varchar(255) NOT NULL, \`end_time\` varchar(255) NOT NULL, \`type\` varchar(1) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`shift_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_98e5075745ff16aeca79c12311c\` FOREIGN KEY (\`shift_id\`) REFERENCES \`shifts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_98e5075745ff16aeca79c12311c\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`shift_id\``);
        await queryRunner.query(`DROP TABLE \`shifts\``);
    }

}
