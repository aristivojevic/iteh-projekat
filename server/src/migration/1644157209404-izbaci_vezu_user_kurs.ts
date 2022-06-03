import { MigrationInterface, QueryRunner } from "typeorm";

export class izbaciVezuUserKurs1644157209404 implements MigrationInterface {
    name = 'izbaciVezuUserKurs1644157209404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`slusanje\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`slusanje\` (\`userId\` int NOT NULL, \`kursId\` int NOT NULL, INDEX \`IDX_3674bec880a3052ca0d1099f20\` (\`userId\`), INDEX \`IDX_7fe17779e7ba0b5e5a67e126e7\` (\`kursId\`), PRIMARY KEY (\`userId\`, \`kursId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`slusanje\` ADD CONSTRAINT \`FK_3674bec880a3052ca0d1099f209\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`slusanje\` ADD CONSTRAINT \`FK_7fe17779e7ba0b5e5a67e126e7d\` FOREIGN KEY (\`kursId\`) REFERENCES \`kurs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
