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
import { Art } from './art.entity';

@Entity()
export class ArtComment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    text: string;

    @Column()
    @Index()
    artId: string;

    @ManyToOne(() => Art)
    @JoinColumn({ name: 'artId' })
    art: Art;

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
