const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class projectComments1652310473654 {
    name = 'projectComments1652310473654';

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "project_comment" (
                "id" SERIAL NOT NULL,
                "text" text NOT NULL,
                "projectId" uuid NOT NULL,
                "authorId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c2b88e7d1046da2d5c06a50da12" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ae5e74e5b3b22980720060c1a4" ON "project_comment" ("projectId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6088fa21198e4de9b3e918ba25" ON "project_comment" ("authorId")
        `);
        await queryRunner.query(`
            ALTER TABLE "project_comment"
            ADD CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project_comment"
            ADD CONSTRAINT "FK_6088fa21198e4de9b3e918ba25e" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "project_comment" DROP CONSTRAINT "FK_6088fa21198e4de9b3e918ba25e"
        `);
        await queryRunner.query(`
            ALTER TABLE "project_comment" DROP CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6088fa21198e4de9b3e918ba25"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ae5e74e5b3b22980720060c1a4"
        `);
        await queryRunner.query(`
            DROP TABLE "project_comment"
        `);
    }
};
