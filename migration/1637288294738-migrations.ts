import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1637288294738 implements MigrationInterface {
    name = 'migrations1637288294738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "comment" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "eventId" integer)`);
        await queryRunner.query(`CREATE TABLE "request" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('reviewing'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "senderId" integer, "eventId" integer)`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startDatetime" varchar NOT NULL, "endDatetime" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('ongoing'), "address" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "createdById" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "type" varchar NOT NULL DEFAULT ('regular'), "grantedAt" varchar)`);
        await queryRunner.query(`CREATE TABLE "event_participants_user" ("eventId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("eventId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb16f471dfa696d2da841aaf21" ON "event_participants_user" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_120333cf695db458809e8b29e2" ON "event_participants_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_events_event" ("userId" integer NOT NULL, "eventId" integer NOT NULL, PRIMARY KEY ("userId", "eventId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "user_events_event" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "user_events_event" ("eventId") `);
        await queryRunner.query(`CREATE TABLE "temporary_review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "comment" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "eventId" integer, CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a0d6db67f30cf0a94c37b4fcb50" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_review"("id", "comment", "createdAt", "userId", "eventId") SELECT "id", "comment", "createdAt", "userId", "eventId" FROM "review"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`ALTER TABLE "temporary_review" RENAME TO "review"`);
        await queryRunner.query(`CREATE TABLE "temporary_request" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('reviewing'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "senderId" integer, "eventId" integer, CONSTRAINT "FK_f0b36dd5420aa9165e74fef75ab" FOREIGN KEY ("senderId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8d91951116c6a146b58a8cd7a9f" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_request"("id", "title", "details", "type", "status", "createdAt", "updatedAt", "senderId", "eventId") SELECT "id", "title", "details", "type", "status", "createdAt", "updatedAt", "senderId", "eventId" FROM "request"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`ALTER TABLE "temporary_request" RENAME TO "request"`);
        await queryRunner.query(`CREATE TABLE "temporary_event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startDatetime" varchar NOT NULL, "endDatetime" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('ongoing'), "address" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "createdById" integer, CONSTRAINT "FK_1d5a6b5f38273d74f192ae552a6" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_event"("id", "title", "description", "startDatetime", "endDatetime", "status", "address", "createdAt", "createdById") SELECT "id", "title", "description", "startDatetime", "endDatetime", "status", "address", "createdAt", "createdById" FROM "event"`);
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
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startDatetime" varchar NOT NULL, "endDatetime" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('ongoing'), "address" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "createdById" integer)`);
        await queryRunner.query(`INSERT INTO "event"("id", "title", "description", "startDatetime", "endDatetime", "status", "address", "createdAt", "createdById") SELECT "id", "title", "description", "startDatetime", "endDatetime", "status", "address", "createdAt", "createdById" FROM "temporary_event"`);
        await queryRunner.query(`DROP TABLE "temporary_event"`);
        await queryRunner.query(`ALTER TABLE "request" RENAME TO "temporary_request"`);
        await queryRunner.query(`CREATE TABLE "request" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('reviewing'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "senderId" integer, "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "request"("id", "title", "details", "type", "status", "createdAt", "updatedAt", "senderId", "eventId") SELECT "id", "title", "details", "type", "status", "createdAt", "updatedAt", "senderId", "eventId" FROM "temporary_request"`);
        await queryRunner.query(`DROP TABLE "temporary_request"`);
        await queryRunner.query(`ALTER TABLE "review" RENAME TO "temporary_review"`);
        await queryRunner.query(`CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "comment" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "review"("id", "comment", "createdAt", "userId", "eventId") SELECT "id", "comment", "createdAt", "userId", "eventId" FROM "temporary_review"`);
        await queryRunner.query(`DROP TABLE "temporary_review"`);
        await queryRunner.query(`DROP INDEX "IDX_c885fff747e43934134ceb67d3"`);
        await queryRunner.query(`DROP INDEX "IDX_507e9d8e231d089b5c4d44cce0"`);
        await queryRunner.query(`DROP TABLE "user_events_event"`);
        await queryRunner.query(`DROP INDEX "IDX_120333cf695db458809e8b29e2"`);
        await queryRunner.query(`DROP INDEX "IDX_cb16f471dfa696d2da841aaf21"`);
        await queryRunner.query(`DROP TABLE "event_participants_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
