import {MigrationInterface, QueryRunner} from "typeorm";

export class migration11637116920862 implements MigrationInterface {
    name = 'migration11637116920862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startDatetime" varchar NOT NULL, "endDatetime" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('ongoing'), "createdById" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "type" varchar NOT NULL DEFAULT ('regular'), "grantedAt" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "event_participants_user" ("eventId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("eventId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb16f471dfa696d2da841aaf21" ON "event_participants_user" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_120333cf695db458809e8b29e2" ON "event_participants_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_events_event" ("userId" integer NOT NULL, "eventId" integer NOT NULL, PRIMARY KEY ("userId", "eventId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "user_events_event" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "user_events_event" ("eventId") `);
        await queryRunner.query(`CREATE TABLE "temporary_event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startDatetime" varchar NOT NULL, "endDatetime" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('ongoing'), "createdById" integer, CONSTRAINT "FK_1d5a6b5f38273d74f192ae552a6" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_event"("id", "title", "description", "startDatetime", "endDatetime", "status", "createdById") SELECT "id", "title", "description", "startDatetime", "endDatetime", "status", "createdById" FROM "event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`ALTER TABLE "temporary_event" RENAME TO "event"`);
        await queryRunner.query(`DROP INDEX "IDX_cb16f471dfa696d2da841aaf21"`);
        await queryRunner.query(`DROP INDEX "IDX_120333cf695db458809e8b29e2"`);
        await queryRunner.query(`CREATE TABLE "temporary_event_participants_user" ("eventId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_cb16f471dfa696d2da841aaf21e" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_120333cf695db458809e8b29e22" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("eventId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_event_participants_user"("eventId", "userId") SELECT "eventId", "userId" FROM "event_participants_user"`);
        await queryRunner.query(`DROP TABLE "event_participants_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_event_participants_user" RENAME TO "event_participants_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_cb16f471dfa696d2da841aaf21" ON "event_participants_user" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_120333cf695db458809e8b29e2" ON "event_participants_user" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_507e9d8e231d089b5c4d44cce0"`);
        await queryRunner.query(`DROP INDEX "IDX_c885fff747e43934134ceb67d3"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_events_event" ("userId" integer NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_c885fff747e43934134ceb67d33" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "eventId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_events_event"("userId", "eventId") SELECT "userId", "eventId" FROM "user_events_event"`);
        await queryRunner.query(`DROP TABLE "user_events_event"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_events_event" RENAME TO "user_events_event"`);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "user_events_event" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "user_events_event" ("eventId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_c885fff747e43934134ceb67d3"`);
        await queryRunner.query(`DROP INDEX "IDX_507e9d8e231d089b5c4d44cce0"`);
        await queryRunner.query(`ALTER TABLE "user_events_event" RENAME TO "temporary_user_events_event"`);
        await queryRunner.query(`CREATE TABLE "user_events_event" ("userId" integer NOT NULL, "eventId" integer NOT NULL, PRIMARY KEY ("userId", "eventId"))`);
        await queryRunner.query(`INSERT INTO "user_events_event"("userId", "eventId") SELECT "userId", "eventId" FROM "temporary_user_events_event"`);
        await queryRunner.query(`DROP TABLE "temporary_user_events_event"`);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "user_events_event" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "user_events_event" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_120333cf695db458809e8b29e2"`);
        await queryRunner.query(`DROP INDEX "IDX_cb16f471dfa696d2da841aaf21"`);
        await queryRunner.query(`ALTER TABLE "event_participants_user" RENAME TO "temporary_event_participants_user"`);
        await queryRunner.query(`CREATE TABLE "event_participants_user" ("eventId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("eventId", "userId"))`);
        await queryRunner.query(`INSERT INTO "event_participants_user"("eventId", "userId") SELECT "eventId", "userId" FROM "temporary_event_participants_user"`);
        await queryRunner.query(`DROP TABLE "temporary_event_participants_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_120333cf695db458809e8b29e2" ON "event_participants_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb16f471dfa696d2da841aaf21" ON "event_participants_user" ("eventId") `);
        await queryRunner.query(`ALTER TABLE "event" RENAME TO "temporary_event"`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startDatetime" varchar NOT NULL, "endDatetime" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('ongoing'), "createdById" integer)`);
        await queryRunner.query(`INSERT INTO "event"("id", "title", "description", "startDatetime", "endDatetime", "status", "createdById") SELECT "id", "title", "description", "startDatetime", "endDatetime", "status", "createdById" FROM "temporary_event"`);
        await queryRunner.query(`DROP TABLE "temporary_event"`);
        await queryRunner.query(`DROP INDEX "IDX_c885fff747e43934134ceb67d3"`);
        await queryRunner.query(`DROP INDEX "IDX_507e9d8e231d089b5c4d44cce0"`);
        await queryRunner.query(`DROP TABLE "user_events_event"`);
        await queryRunner.query(`DROP INDEX "IDX_120333cf695db458809e8b29e2"`);
        await queryRunner.query(`DROP INDEX "IDX_cb16f471dfa696d2da841aaf21"`);
        await queryRunner.query(`DROP TABLE "event_participants_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
