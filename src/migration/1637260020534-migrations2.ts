import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations21637260020534 implements MigrationInterface {
    name = 'migrations21637260020534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "request" ADD "eventId" integer`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_8d91951116c6a146b58a8cd7a9f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_8d91951116c6a146b58a8cd7a9f"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "type"`);
    }

}
