import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumns1644264179231 implements MigrationInterface {
    name = 'addColumns1644264179231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kurs\` ADD \`opis\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kviz\` DROP FOREIGN KEY \`FK_7b7528d72365559cdd779674be1\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` CHANGE \`kursId\` \`kursId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`pitanje\` DROP FOREIGN KEY \`FK_49d7ca163e6860d7a5646eb49a8\``);
        await queryRunner.query(`ALTER TABLE \`pitanje\` DROP COLUMN \`opcije\``);
        await queryRunner.query(`ALTER TABLE \`pitanje\` ADD \`opcije\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pitanje\` CHANGE \`kvizId\` \`kvizId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`category\` \`category\` varchar(255) NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`kviz\` ADD CONSTRAINT \`FK_7b7528d72365559cdd779674be1\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pitanje\` ADD CONSTRAINT \`FK_49d7ca163e6860d7a5646eb49a8\` FOREIGN KEY (\`kvizId\`) REFERENCES \`kviz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pitanje\` DROP FOREIGN KEY \`FK_49d7ca163e6860d7a5646eb49a8\``);
        await queryRunner.query(`ALTER TABLE \`kviz\` DROP FOREIGN KEY \`FK_7b7528d72365559cdd779674be1\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`category\` \`category\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pitanje\` CHANGE \`kvizId\` \`kvizId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pitanje\` DROP COLUMN \`opcije\``);
        await queryRunner.query(`ALTER TABLE \`pitanje\` ADD \`opcije\` longtext COLLATE "utf8mb4_bin" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pitanje\` ADD CONSTRAINT \`FK_49d7ca163e6860d7a5646eb49a8\` FOREIGN KEY (\`kvizId\`) REFERENCES \`kviz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kviz\` CHANGE \`kursId\` \`kursId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`kviz\` ADD CONSTRAINT \`FK_7b7528d72365559cdd779674be1\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kurs\` DROP COLUMN \`opis\``);
    }

}
