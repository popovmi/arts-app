module.exports = class artsCommentsCascade1653919921430 {
    name = 'artsCommentsCascade1653919921430';

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "art_file"
			DROP CONSTRAINT "FK_ba1de964e765e0491aaa1d80d01",
            ADD CONSTRAINT "FK_ba1de964e765e0491aaa1d80d01" FOREIGN KEY ("artId") REFERENCES "art"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);

        await queryRunner.query(`
			ALTER TABLE "art_comment"
			DROP CONSTRAINT "FK_b33bd1cfbb09d3901daa2565fb2",
			ADD CONSTRAINT "FK_b33bd1cfbb09d3901daa2565fb2" FOREIGN KEY ("artId") REFERENCES "art"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "art_file"
			DROP CONSTRAINT "FK_ba1de964e765e0491aaa1d80d01",
            ADD CONSTRAINT "FK_ba1de964e765e0491aaa1d80d01" FOREIGN KEY ("artId") REFERENCES "art"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "art_comment"
			DROP CONSTRAINT "FK_b33bd1cfbb09d3901daa2565fb2",
            ADD CONSTRAINT "FK_b33bd1cfbb09d3901daa2565fb2" FOREIGN KEY ("artId") REFERENCES "art"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }
};
