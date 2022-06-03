import {MigrationInterface, QueryRunner} from "typeorm";

export class createKviz1644068337384 implements MigrationInterface {
    name = 'createKviz1644068337384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`kviz\` (\`id\` int NOT NULL AUTO_INCREMENT, \`naziv\` varchar(255) NOT NULL, \`kursId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`kviz\` ADD CONSTRAINT \`FK_7b7528d72365559cdd779674be1\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kviz\` DROP FOREIGN KEY \`FK_7b7528d72365559cdd779674be1\``);
        await queryRunner.query(`DROP TABLE \`kviz\``);
    }

}
