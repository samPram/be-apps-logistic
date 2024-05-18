import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1715946613860 implements MigrationInterface {
    name = 'InitMigration1715946613860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logistic_name" character varying(20) NOT NULL, "amount" bigint NOT NULL, "destination_name" character varying(50) NOT NULL, "origin_name" character varying(50) NOT NULL, "duration" character varying(10), CONSTRAINT "PK_94613ec7dc72f7dfa2d072a31cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_destination" ON "courier" ("destination_name") `);
        await queryRunner.query(`CREATE INDEX "index_origin" ON "courier" ("origin_name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_origin"`);
        await queryRunner.query(`DROP INDEX "public"."index_destination"`);
        await queryRunner.query(`DROP TABLE "courier"`);
    }

}
