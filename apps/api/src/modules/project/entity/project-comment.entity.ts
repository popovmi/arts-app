import { User } from '@/modules/user';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectComment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    text: string;

    @Column()
    @Index()
    projectId: string;

    @ManyToOne(() => Project, (project) => project.comments, { cascade: true })
    @JoinColumn({ name: 'projectId' })
    project: Project;

    @Column()
    @Index()
    authorId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'authorId' })
    author: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
