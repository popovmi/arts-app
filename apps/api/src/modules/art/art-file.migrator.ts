import { ApiConfigService } from '@/shared';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { access, copyFile, rm } from 'fs/promises';
import { join } from 'path';
import { EntityManager } from 'typeorm';
import { Art, ArtFile } from './entity';

@Injectable()
export class ArtFileMigrator implements OnModuleInit {
    private logger = new Logger(ArtFileMigrator.name);

    constructor(readonly em: EntityManager, readonly config: ApiConfigService) {}

    async onModuleInit() {
        // const arts = await this.em.find(Art, { relations: ['files'] });
        // for (const art of arts) {
        //     const origFilePath = art.files[0].originalPath;
        //     const wmFilePath = art.files[0].watermarkPath;

        //     this.logger.debug({ origFilePath });
        //     const origFilePathParts = origFilePath.split('\\');
        //     const origLastPart = origFilePathParts[origFilePathParts.length - 1];
        //     const origExtension = origLastPart.split('.')[1];
        //     origFilePathParts[origFilePathParts.length - 1] = join(`${art.id}.${origExtension}`);
        //     const newOrigFilePath = origFilePathParts.join('\\');
        //     this.logger.debug({ newOrigFilePath });

        //     this.logger.debug({ wmFilePath });
        //     const wmFilePathParts = wmFilePath.split('\\');
        //     const wmLastPart = wmFilePathParts[wmFilePathParts.length - 1];
        //     const wmExtension = wmLastPart.split('.')[1];
        //     wmFilePathParts[wmFilePathParts.length - 1] = join(`${art.id}.${wmExtension}`);
        //     const newWmFilePath = wmFilePathParts.join('\\');
        //     this.logger.debug({ newWmFilePath });

        //     try {
        //         const diskOrigPath = join(this.config.fileStoragePath, origFilePath);
        //         const diskWmPath = join(this.config.fileStoragePath, wmFilePath);
        //         const newDiskOrigPath = join(this.config.fileStoragePath, newOrigFilePath);
        //         const newDiskWmPath = join(this.config.fileStoragePath, newWmFilePath);
        //         await access(diskOrigPath);
        //         await access(diskWmPath);
        //         await copyFile(diskOrigPath, newDiskOrigPath);
        //         await copyFile(diskWmPath, newDiskWmPath);
        //         await rm(diskOrigPath);
        //         await rm(diskWmPath);

        //         art.files[0].originalPath = newOrigFilePath;
        //         art.files[0].watermarkPath = newWmFilePath;
        //         await this.em.save(ArtFile, art.files[0]);
        //     } catch (e) {
        //         this.logger.error(e);
        //     }
        // }
    }
}
