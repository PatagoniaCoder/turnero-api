import {MigrationInterface, QueryRunner} from "typeorm";

export class first1642304199839 implements MigrationInterface {
    name = 'first1642304199839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "turno" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "available" integer NOT NULL, CONSTRAINT "PK_0de9cfaa37f128f7e18e73d4074" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "turno"`);
    }

}
