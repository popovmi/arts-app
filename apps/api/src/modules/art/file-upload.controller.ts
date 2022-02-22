import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import * as multer from 'multer';
import { v4 } from 'uuid';

@Controller('upload')
export class FileUploadController {
  @Post('art')
  @UseInterceptors(
    FileInterceptor('artFile', {
      fileFilter: (req: Request, { mimetype }, cb) => {
        !['application/pdf', 'image/jpeg'].includes(mimetype)
          ? cb(new BadRequestException('Invalid mimetype'), false)
          : cb(null, true);
      },
      storage: multer.diskStorage({
        destination: './upload',
        filename: function (req: Request, file, cb) {
          const fileName = v4() + '.' + file.originalname.split('.').pop();

          cb(null, fileName);
        },
      }),
    })
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return { filePath: `upload/${file.filename}`, fileName: file.originalname };
  }
}
