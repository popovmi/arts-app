import { ArtModule } from '@/modules/art/art.module';
import { CustomerModule } from '@/modules/customer';
import { FactoryModule } from '@/modules/factory';
import { UserModule } from '@/modules/user';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectComment } from './entity';
import { Project } from './entity/project.entity';
import { ProjectLoader } from './loaders';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
    imports: [
        UserModule,
        forwardRef(() => ArtModule),
        FactoryModule,
        CustomerModule,
        // forwardRef(() => FactoryModule),
        // forwardRef(() => CustomerModule),
        TypeOrmModule.forFeature([Project, ProjectComment]),
    ],
    providers: [ProjectResolver, ProjectService, ProjectLoader],
    exports: [ProjectService],
})
export class ProjectModule {}
