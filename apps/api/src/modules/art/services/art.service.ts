import { filterQuery } from '@/shared/utils/query-builder';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice } from 'graphql-relay';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ArtCommentInput, ArtResponse, CreateArtInput, FindArtArgs, UpdateArtInput } from '../dto';
import { ArtComment } from '../entity';
import { Art } from '../entity/art.entity';
import { ArtFileService } from './art-file.service';

@Injectable()
export class ArtService {
    private logger = new Logger(ArtService.name);

    constructor(
        @InjectRepository(Art) private artRepository: Repository<Art>,
        @InjectRepository(ArtComment)
        private artCommentRepository: Repository<ArtComment>,
        private artFileService: ArtFileService
    ) {}

    public async getByIds(ids: string[]): Promise<Art[]> {
        return this.artRepository.find({
            where: { id: In(ids) },
        });
    }

    async getArt(id: string): Promise<Art> {
        return this.artRepository.findOne({
            where: { id },
            relations: ['comments', 'comments.author'],
        });
    }

    async getArts({ filter, pagination }: FindArtArgs): Promise<ArtResponse> {
        const { take = 50, skip = 0 } = pagination.pagingParams();
        const query = filterQuery(this.artRepository.createQueryBuilder('arts'), 'arts', filter, ['project'])
            .skip(skip)
            .take(take);
        const count = await query.getCount();

        query.addSelect(`left("arts"."name", strpos("arts"."name", '-') - 1)`, 'code');
        query.addSelect(
            `length(left("arts"."name", strpos("arts"."name", '-') - 1))::integer`,
            'code_length'
        );
        query.addOrderBy(`code_length`, 'ASC');
        query.addOrderBy('code', 'ASC');

        this.logger.debug({ message: 'arts query', query: query.getQuery() });

        const arts = await query.getMany();
        const page = connectionFromArraySlice(arts, pagination, {
            arrayLength: count,
            sliceStart: skip || 0,
        });

        return { page, pageData: { count, take, skip } };
    }

    @Transactional()
    public async createArt(createArtInput: CreateArtInput): Promise<Art> {
        const { filePath, ...input } = createArtInput;
        const art = await this.artRepository.save({ ...input });

        if (filePath) await this.artFileService.saveArtFile(filePath, art);

        return art;
    }

    @Transactional()
    public async updateArt(updateArtInput: UpdateArtInput): Promise<Art> {
        const { id, filePath, ...updateInput } = updateArtInput;
        const art = await this.artRepository.findOneOrFail({ where: { id } });

        if (filePath) await this.artFileService.saveArtFile(filePath, art);
        Object.assign(art, { ...updateInput });

        return await this.artRepository.save(art);
    }

    public async loadArtsFiles(ids: string[]): Promise<Pick<Art, 'id' | 'files'>[]> {
        const arts = await this.artRepository.find({
            where: { id: In(ids) },
            select: ['id'],
            relations: ['files'],
        });

        return arts;
    }

    public async addArtComment({ artId, text, authorId }: ArtCommentInput & { authorId: string }) {
        await this.artRepository.findOneOrFail({
            where: { id: artId },
            select: ['id'],
        });

        const comment = await this.artCommentRepository.save({
            artId,
            text,
            authorId,
        });

        return this.artCommentRepository.findOne({
            where: { id: comment.id },
            relations: ['author'],
        });
    }

    public async updateArtComment({
        commentId,
        authorId,
        text,
    }: {
        commentId: number;
        authorId: string;
        text: string;
    }) {
        const comment = await this.artCommentRepository.findOneOrFail({
            where: { id: commentId },
            relations: ['author'],
        });

        if (authorId !== comment.authorId) {
            throw new Error('Невозможно исправить чужой комментарий!');
        }

        comment.text = text;
        return await this.artCommentRepository.save(comment);
    }

    public async deleteComment({
        commentId,
        authorId,
        artId,
    }: {
        commentId: number;
        authorId: string;
        artId: string;
    }) {
        const comment = await this.artCommentRepository.findOneOrFail({
            where: { id: commentId },
        });

        if (authorId !== comment.authorId) {
            throw new Error('Невозможно удалить чужой комментарий!');
        }

        if (artId !== comment.artId) {
            throw new Error('Не тот арт!');
        }

        await this.artCommentRepository.delete({ id: commentId });
    }

    @Transactional()
    public async createManyArts(artsInput: CreateArtInput[]) {
        const arts: Art[] = [];
        for (const artInput of artsInput) {
            const { filePath, ...input } = artInput;
            const art = await this.artRepository.save({ ...input });
            arts.push(art);
            if (filePath) await this.artFileService.saveArtFile(filePath, art);
        }
        return arts;
    }

    public async deleteArt(where: { id?: string; projectId?: string }) {
        await this.artRepository.delete(where);
    }
}
