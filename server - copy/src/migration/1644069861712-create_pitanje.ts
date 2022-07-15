import {MigrationInterface, QueryRunner} from "typeorm";

export class createPitanje1644069861712 implements MigrationInterface {
    name = 'createPitanje1644069861712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pitanje\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tekstPitanja\` varchar(255) NOT NULL, \`brojPoena\` int NOT NULL, \`opcije\` json NOT NULL, \`kvizId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`kviz\` DROP FOREIGN KEY \`FK_7b7528d72365559cdd779674be1\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` CHANGE \`kursId\` \`kursId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`kviz\` ADD CONSTRAINT \`FK_7b7528d72365559cdd779674be1\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pitanje\` ADD CONSTRAINT \`FK_49d7ca163e6860d7a5646eb49a8\` FOREIGN KEY (\`kvizId\`) REFERENCES \`kviz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pitanje\` DROP FOREIGN KEY \`FK_49d7ca163e6860d7a5646eb49a8\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` DROP FOREIGN KEY \`FK_7b7528d72365559cdd779674be1\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` CHANGE \`kursId\` \`kursId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`kviz\` ADD CONSTRAINT \`FK_7b7528d72365559cdd779674be1\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`pitanje\``);
    }

}
