import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync } from 'fs';
import { copyFile, mkdir, rm } from 'fs/promises';
import * as Jimp from 'jimp';
import { Poppler } from 'node-poppler';
import { dirname, resolve } from 'path';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ArtFile } from '../entity/art-file.entity';
import { Art } from '../entity/art.entity';

@Injectable()
export class ArtFileService {
    private originalStoragePath = './test-files/original';
    private watermarkStoragePath = './test-files/watermark';

    private _poppler: Poppler;

    constructor(@InjectRepository(ArtFile) private artFileRepository: Repository<ArtFile>) {
        this._poppler = process.platform === 'linux' ? new Poppler('./.apt/usr/bin') : new Poppler();
    }

    private async checkDir(path: string) {
        const dir = dirname(path);
        if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    }

    private async fromPdfToJpeg(src: string, dest: string) {
        const options = {
            firstPageToConvert: 1,
            lastPageToConvert: 1,
            jpegFile: true,
            singleFile: true,
        };
        const res = await this._poppler.pdfToCairo(src, dest, options);
        if (res instanceof Error) throw res;
    }

    public async createWaterMarkFromJpeg(src: string, dest: string): Promise<void> {
        const LOGO = './watermark/1200px-Australian_Defence_Force_Academy_coat_of_arms.svg.png';
        const image = await Jimp.read(src);
        const logo = await Jimp.read(LOGO);
        logo.resize(image.bitmap.width * 0.9, image.bitmap.height * 0.9);
        const X = (image.bitmap.width - logo.bitmap.width) / 2;
        const Y = (image.bitmap.height - logo.bitmap.height) / 2;
        const composed = image.composite(logo, X, Y, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.4,
            opacityDest: 1,
        });
        await composed.writeAsync(dest);
    }

    private async saveWatemark(filePath: string, art: Art) {
        const fileName = resolve(filePath).split('/').pop();
        const fileExtension = fileName.split('.')[1];
        let watermarkPath = `${this.watermarkStoragePath}/${art.name}`;

        await this.checkDir(watermarkPath);

        switch (fileExtension) {
            case 'pdf':
                await this.fromPdfToJpeg(filePath, watermarkPath);
                watermarkPath = watermarkPath + '.jpg';
                await this.createWaterMarkFromJpeg(watermarkPath, watermarkPath);
                break;

            case 'jpg':
                watermarkPath = watermarkPath + '.jpg';
                await this.createWaterMarkFromJpeg(filePath, watermarkPath);
                break;

            default:
                throw new Error('Некорректный формат файла');
        }

        return watermarkPath;
    }

    private async saveOriginal(filePath: string, art: Art) {
        const fileName = resolve(filePath).split('/').pop();
        const fileExtension = fileName.split('.')[1];
        const originalFilePath = `${this.originalStoragePath}/${art.name}.${fileExtension}`;

        await this.checkDir(originalFilePath);
        await copyFile(filePath, originalFilePath);

        return originalFilePath;
    }

    @Transactional()
    public async saveArtFile(filePath: string, art: Art) {
        let originalPath: string;
        let watermarkPath: string;

        try {
            originalPath = await this.saveOriginal(filePath, art);
            watermarkPath = await this.saveWatemark(filePath, art);
            await this.artFileRepository.upsert({ artId: art.id, originalPath, watermarkPath }, ['artId']);
        } catch (e) {
            if (existsSync(originalPath)) await rm(originalPath);
            if (existsSync(watermarkPath)) await rm(watermarkPath);
            throw e;
        }
    }
}
