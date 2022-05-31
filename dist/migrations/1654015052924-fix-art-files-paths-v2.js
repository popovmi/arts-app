const { Logger } = require('@nestjs/common'),
    { readdir } = require('fs/promises'),
    { join } = require('path');

module.exports = class fixArtFilesPathsV21654015052924 {
    name = 'fixArtFilesPathsV21654015052924';
    logger = new Logger(fixArtFilesPathsV21654015052924.name);
    config = { fileStoragePath: process.env.FILE_STORAGE_PATH, nodeEnv: process.env.NODE_ENV };

    async up(queryRunner) {
        const originalFiles = await readdir(join(this.config.fileStoragePath, 'original')),
            watermarkFiles = await readdir(join(this.config.fileStoragePath, 'watermark'));

        [originalFiles, watermarkFiles].forEach((array) => {
            array.includes('.gitignore') &&
                array.splice(
                    array.findIndex((elem) => '.gitignore' === elem),
                    1
                );
        });

        for (const file of originalFiles) {
            const [fileName, extension] = file.split('.'),
                [art] = await queryRunner.query(
                    `select * from art a left join art_file af on af."artId" = a.id where a."createdAt" < '2022-05-30' and a.name = '${fileName}'`
                );
            art &&
                (await queryRunner.query(
                    `update art_file af set "originalPath" = 'original\\${art.name}.${extension}' where af."artId" = '${art.id}'`
                ));
        }

        for (const file of watermarkFiles) {
            const [fileName, extension] = file.split('.'),
                [art] = await queryRunner.query(
                    `select * from art a left join art_file af on af."artId" = a.id where a."createdAt" < '2022-05-30' and a.name = '${fileName}'`
                );
            art &&
                (await queryRunner.query(
                    `update art_file af set "watermarkPath" = 'watermark\\${art.name}.${extension}' where af."artId" = '${art.id}'`
                ));
        }
    }

    async down(queryRunner) {
        await queryRunner.query('select 1');
    }
};
