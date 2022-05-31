const { Logger } = require('@nestjs/common');
const { readdir } = require('fs/promises');
const { join } = require('path');

module.exports = class fixArtsFilesPaths1653991278349 {
    name = 'fixArtsFilesPaths1653991278349';
    logger = new Logger(fixArtsFilesPaths1653991278349.name);
    config = { fileStoragePath: process.env.FILE_STORAGE_PATH, nodeEnv: process.env.NODE_ENV };

    async up(queryRunner) {
        const originalFiles = await readdir(join(this.config.fileStoragePath, 'original'));
        const watermarkFiles = await readdir(join(this.config.fileStoragePath, 'watermark'));
        [originalFiles, watermarkFiles].forEach((array) => {
            if (array.includes('.gitignore')) {
                array.splice(
                    array.findIndex((elem) => elem === '.gitignore'),
                    1
                );
            }
        });
        for (const file of originalFiles) {
            const [fileName, extension] = file.split('.');
            const [art] = await queryRunner.query(`
				select
					*
				from
					art a
				left join art_file af
					on af."artId" = a.id
				where
					a."createdAt" < '2022-05-30'
					and	a.name = '${fileName}'
			`);
            if (art) {
                await queryRunner.query(`
					update
						art_file af
					set
						"originalPath" = 'original\\${art.id}.${extension}'
					where af."artId" = '${art.id}'
				`);
            }
        }
        for (const file of watermarkFiles) {
            const [fileName, extension] = file.split('.');
            const [art] = await queryRunner.query(`
				select
					*
				from 
					art a 
				left join art_file af 
					on af."artId" = a.id 
				where
					a."createdAt" < '2022-05-30'
					and	a.name = '${fileName}'
				 `);
            if (art) {
                await queryRunner.query(`
					update
						art_file af
					set
						"watermarkPath" = 'watermark\\${art.id}.${extension}'
					where af."artId" = '${art.id}'
				`);
            }
        }
    }

    async down(queryRunner) {
        await queryRunner.query('select 1');
    }
};
