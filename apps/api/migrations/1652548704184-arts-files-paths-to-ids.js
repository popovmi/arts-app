const { Logger } = require('@nestjs/common');
const { access, copyFile, rm } = require('fs/promises');
const { join } = require('path');
const { MigrationInterface, QueryRunner } = require('typeorm');
const { config } = require('dotenv');

config();

module.exports = class artsFilesPathsToIds1652548704184 {
	name = 'artsFilesPathsToIds1652548704184';
    logger = new Logger(artsFilesPathsToIds1652548704184.name);
    config = { fileStoragePath: process.env.FILE_STORAGE_PATH };
    async up(queryRunner) {
        const arts = await queryRunner.manager.query(
			'select * from art a left join art_file af on af."artId" = a.id '
		);
		this.logger.log({arts})
        for (const art of arts) {
            const origFilePath = art.originalPath;
            const wmFilePath = art.watermarkPath;

            const origFilePathParts = origFilePath.split('\\');
            const origLastPart = origFilePathParts[origFilePathParts.length - 1];
            const origExtension = origLastPart.split('.')[1];
            const newOrigFilePath = origFilePathParts.join('\\');
            origFilePathParts[origFilePathParts.length - 1] = join(`${art.id}.${origExtension}`);

            this.logger.log({ origFilePath });
            this.logger.log({ newOrigFilePath });

            const wmFilePathParts = wmFilePath.split('\\');
            const wmLastPart = wmFilePathParts[wmFilePathParts.length - 1];
            const wmExtension = wmLastPart.split('.')[1];
            const newWmFilePath = wmFilePathParts.join('\\');
            wmFilePathParts[wmFilePathParts.length - 1] = join(`${art.id}.${wmExtension}`);

            this.logger.log({ wmFilePath });
            this.logger.log({ newWmFilePath });

            try {
                const diskOrigPath = join(this.config.fileStoragePath, origFilePath);
                const diskWmPath = join(this.config.fileStoragePath, wmFilePath);
                const newDiskOrigPath = join(this.config.fileStoragePath, newOrigFilePath);
                const newDiskWmPath = join(this.config.fileStoragePath, newWmFilePath);
                await access(diskOrigPath);
                await access(diskWmPath);
                await copyFile(diskOrigPath, newDiskOrigPath);
                await copyFile(diskWmPath, newDiskWmPath);
				await queryRunner.manager.query(
					`update art_file set "watermarkPath" = '${newWmFilePath}', "originalPath" = '${newOrigFilePath}'`
				);
            } catch (e) {
                this.logger.error(e);
                throw e;
            }
        }
    }

    async down(queryRunner) {
		const arts = await queryRunner.manager.query(
			'select * from art a left join art_file af on af."artId" = a.id '
		);
		this.logger.log({arts})
        for (const art of arts) {
            const origFilePath = art.originalPath;
            const wmFilePath = art.watermarkPath;

            const origFilePathParts = origFilePath.split('\\');
            const origLastPart = origFilePathParts[origFilePathParts.length - 1];
            const origExtension = origLastPart.split('.')[1];
            origFilePathParts[origFilePathParts.length - 1] = join(`${art.name}.${origExtension}`);
            const newOrigFilePath = origFilePathParts.join('\\');

            this.logger.log({ origFilePath });
            this.logger.log({ newOrigFilePath });

            const wmFilePathParts = wmFilePath.split('\\');
            const wmLastPart = wmFilePathParts[wmFilePathParts.length - 1];
            const wmExtension = wmLastPart.split('.')[1];
            wmFilePathParts[wmFilePathParts.length - 1] = join(`${art.name}.${wmExtension}`);
            const newWmFilePath = wmFilePathParts.join('\\');

            this.logger.log({ wmFilePath });
            this.logger.log({ newWmFilePath });

            try {
                const diskOrigPath = join(this.config.fileStoragePath, origFilePath);
                const diskWmPath = join(this.config.fileStoragePath, wmFilePath);
                const newDiskOrigPath = join(this.config.fileStoragePath, newOrigFilePath);
                const newDiskWmPath = join(this.config.fileStoragePath, newWmFilePath);
                await access(diskOrigPath);
                await access(diskWmPath);
                await copyFile(diskOrigPath, newDiskOrigPath);
                await copyFile(diskWmPath, newDiskWmPath);
				await queryRunner.manager.query(
					`update art_file set "watermarkPath" = '${newWmFilePath}', "originalPath" = '${newOrigFilePath}'`
				);
            } catch (e) {
                this.logger.error(e);
                throw e;
            }
        }
    }
};
