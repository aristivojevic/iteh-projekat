import {MigrationInterface, QueryRunner} from "typeorm";

export class createPokusaj1644068789226 implements MigrationInterface {
    name = 'createPokusaj1644068789226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pokusaj\` (\`userId\` int NOT NULL, \`kvizId\` int NOT NULL, \`brojPoena\` int NOT NULL, PRIMARY KEY (\`userId\`, \`kvizId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`kviz\` DROP FOREIGN KEY \`FK_7b7528d72365559cdd779674be1\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` CHANGE \`kursId\` \`kursId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`kviz\` ADD CONSTRAINT \`FK_7b7528d72365559cdd779674be1\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pokusaj\` ADD CONSTRAINT \`FK_3a54e30abbad1153ef79cd3fafe\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pokusaj\` ADD CONSTRAINT \`FK_b83ce2c1bdebcbd0be422b64a1a\` FOREIGN KEY (\`kvizId\`) REFERENCES \`kviz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pokusaj\` DROP FOREIGN KEY \`FK_b83ce2c1bdebcbd0be422b64a1a\``);
        await queryRunner.query(`ALTER TABLE \`pokusaj\` DROP FOREIGN KEY \`FK_3a54e30abbad1153ef79cd3fafe\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` DROP FOREIGN KEY \`FK_7b7528d72365559cdd779674be1\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` CHANGE \`kursId\` \`kursId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`kviz\` ADD CONSTRAINT \`FK_7b7528d72365559cdd779674be1\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`pokusaj\``);
    }

}
