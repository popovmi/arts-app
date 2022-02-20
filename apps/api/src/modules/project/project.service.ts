import { filterQuery, orderQuery } from '@/shared/utils/query-builder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { In, Repository } from 'typeorm';
import { CreateProjectInput, FindProjectArgs, ProjectResponse, UpdateProjectInput } from './dto';
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
        const query = filterQuery(this.projectRepository.createQueryBuilder('projects'), 'projects', filter, [])
            .skip(skip)
            .take(take);
        const count = await query.getCount();

        orderQuery(query, { ...order });

        const projects = await query.getMany();
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
