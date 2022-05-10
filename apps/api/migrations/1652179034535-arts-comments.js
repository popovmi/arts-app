module.exports = class artsComments1652179034535 {
    name = 'artsComments1652179034535';

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "art_comment" (
                "id" SERIAL NOT NULL,
                "text" text NOT NULL,
                "artId" uuid NOT NULL,
                "authorId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_06b8ef71ae9dd58bc8ec5919a10" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b33bd1cfbb09d3901daa2565fb" ON "art_comment" ("artId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0587d0c38f000285694bbd57c9" ON "art_comment" ("authorId")
        `);
        await queryRunner.query(`
            ALTER TABLE "art_comment"
            ADD CONSTRAINT "FK_b33bd1cfbb09d3901daa2565fb2" FOREIGN KEY ("artId") REFERENCES "art"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "art_comment"
            ADD CONSTRAINT "FK_0587d0c38f000285694bbd57c97" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "art_comment" DROP CONSTRAINT "FK_0587d0c38f000285694bbd57c97"
        `);
        await queryRunner.query(`
            ALTER TABLE "art_comment" DROP CONSTRAINT "FK_b33bd1cfbb09d3901daa2565fb2"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0587d0c38f000285694bbd57c9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b33bd1cfbb09d3901daa2565fb"
        `);
        await queryRunner.query(`
            DROP TABLE "art_comment"
        `);
    }
};
