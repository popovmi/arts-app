import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { filterQuery, orderQuery } from 'shared/utils/query-builder';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto';
import { FindProjectArgs } from './dto/find-projects.args';
import { ProjectResponse } from './dto/projects.response';
import { Project } from './entity/project.entity';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) {}

  async getProject(id: string): Promise<Project> {
    return this.projectRepository.findOne({ id });
  }

  async getProjects({ filter, order, pagination }: FindProjectArgs): Promise<ProjectResponse> {
    const query = filterQuery(this.projectRepository.createQueryBuilder(), filter);
    const { take = 50, skip = 0 } = pagination.pagingParams();

    query.skip(skip);
    query.take(take);
    orderQuery(query, { ...order });

    const [projects, count] = await query.getManyAndCount();
    const page = connectionFromArraySlice(projects, pagination, { arrayLength: count, sliceStart: skip || 0 });

    return { page, pageData: { count, take, skip } };
  }

  public async createProject(createProjectInput: CreateProjectInput): Promise<Project> {
    const { hasDesignDoc, internal, name } = createProjectInput;

    const project = this.projectRepository.create({
      hasDesignDoc,
      internal,
      name,
    });

    return await this.projectRepository.save(project);
  }
}
