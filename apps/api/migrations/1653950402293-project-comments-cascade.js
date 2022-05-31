module.exports = class projectCommentsCascade1653950402293 {
    async up(queryRunner) {
        await queryRunner.query(`
			ALTER TABLE "project_comment"
			DROP CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41",
			ADD CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
		ALTER TABLE "project_comment"
		DROP CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41",
		ADD CONSTRAINT "FK_ae5e74e5b3b22980720060c1a41" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
	`);
    }
};
