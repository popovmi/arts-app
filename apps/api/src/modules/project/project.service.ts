import { filterQuery } from '@/shared/utils/query-builder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { In, Repository } from 'typeorm';
import { ArtService } from '@/modules/art/services';
import {
    CreateProjectInput,
    FindProjectArgs,
    ProjectCommentInput,
    ProjectResponse,
    UpdateProjectInput,
} from './dto';
import { Project, ProjectComment } from './entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(ProjectComment)
        private projectCommentRepository: Repository<ProjectComment>,
        private artService: ArtService
    ) {}

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
        return this.projectRepository.findOne({ where: { id }, relations: ['comments', 'comments.author'] });
    }

    async getProjects({ filter, pagination }: FindProjectArgs): Promise<ProjectResponse> {
        const { take = 50, skip = 0 } = pagination.pagingParams();
        const query = filterQuery(
            this.projectRepository.createQueryBuilder('projects'),
            'projects',
            filter,
            []
        )
            .skip(skip)
            .take(take);

        const count = await query.getCount();

        query.addSelect(`left("projects"."name", strpos("projects"."name", '-') - 1)`, 'code');
        query.addSelect(
            `length(left("projects"."name", strpos("projects"."name", '-') - 1))::integer`,
            'code_length'
        );
        query.addOrderBy(`code_length`, 'ASC');
        query.addOrderBy('code', 'ASC');

        const projects = await query.getMany();

        const page = connectionFromArraySlice(projects, pagination, {
            arrayLength: count,
            sliceStart: skip || 0,
        });

        return { page, pageData: { count, take, skip } };
    }

    public createProject(createProjectInput: CreateProjectInput): Promise<Project> {
        const project = this.projectRepository.create({
            ...createProjectInput.format(),
        });

        return this.projectRepository.save(project);
    }

    public async updateProject(updateProjectInput: UpdateProjectInput): Promise<Project> {
        const { id, ...updateInput } = updateProjectInput.format();
        const project = await this.projectRepository.findOneOrFail({ where: { id } });

        Object.assign(project, {
            ...updateInput,
        });

        return this.projectRepository.save(project);
    }

    public async addProjectComment({
        projectId,
        text,
        authorId,
    }: ProjectCommentInput & { authorId: string }) {
        await this.projectRepository.findOneOrFail({
            where: { id: projectId },
            select: ['id'],
        });

        const comment = await this.projectCommentRepository.save({
            projectId,
            text,
            authorId,
        });

        return this.projectCommentRepository.findOne({
            where: { id: comment.id },
            relations: ['author'],
        });
    }

    public async updateProjectComment({
        commentId,
        authorId,
        text,
    }: {
        commentId: number;
        authorId: string;
        text: string;
    }) {
        const comment = await this.projectCommentRepository.findOneOrFail({
            where: { id: commentId },
            relations: ['author'],
        });

        if (authorId !== comment.authorId) {
            throw new Error('Невозможно редактировать чужой комментарий!');
        }

        comment.text = text;
        return this.projectCommentRepository.save(comment);
    }

    public async deleteComment({
        commentId,
        authorId,
        projectId,
    }: {
        commentId: number;
        authorId: string;
        projectId: string;
    }) {
        const comment = await this.projectCommentRepository.findOneOrFail({
            where: { id: commentId },
        });

        if (authorId !== comment.authorId) {
            throw new Error('Невозможно удалить чужой комментарий!');
        }

		if (projectId !== comment.projectId) {
            throw new Error('Не тот проект!');
        }

        await this.projectCommentRepository.delete({ id: commentId });
    }

    public async deleteProject(id: string) {
        await this.artService.deleteArt({ projectId: id });
        await this.projectRepository.delete({ id });
    }
}
