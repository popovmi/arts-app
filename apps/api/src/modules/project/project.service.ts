import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { filterQuery, orderQuery } from 'shared/utils/query-builder';
import { In, Repository } from 'typeorm';
import { CreateProjectInput } from './dto';
import { FindProjectArgs } from './dto/find-projects.args';
import { ProjectResponse } from './dto/projects.response';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entity/project.entity';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) {}

    public async getByIds(ids: string[]): Promise<Project[]> {
        return this.projectRepository.find({
            where: { id: In(ids) },
        });
    }

    public async loadProjectsArts(projectIds: string[]): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { id: In(projectIds) },
            select: ['id'],
            relations: ['arts'],
        });
    }

    public async getProject(id: string): Promise<Project> {
        return this.projectRepository.findOne({ id });
    }

    async getProjects({ filter, order, pagination }: FindProjectArgs): Promise<ProjectResponse> {
        const { take = 50, skip = 0 } = pagination.pagingParams();
        const query = filterQuery(this.projectRepository.createQueryBuilder(), filter).skip(skip).take(take);

        orderQuery(query, { ...order });

        const [projects, count] = await query.getManyAndCount();
        const page = connectionFromArraySlice(projects, pagination, { arrayLength: count, sliceStart: skip || 0 });

        return { page, pageData: { count, take, skip } };
    }

    public async createProject(createProjectInput: CreateProjectInput): Promise<Project> {
        const project = this.projectRepository.create({
            ...createProjectInput,
        });

        return await this.projectRepository.save(project);
    }

    public async updateProject(updateProjectInput: UpdateProjectInput): Promise<Project> {
        const { id, ...updateInput } = updateProjectInput.format();
        const project = await this.projectRepository.findOneOrFail({ id });

        Object.assign(project, {
            ...updateInput,
        });

        return await this.projectRepository.save(project);
    }
}
