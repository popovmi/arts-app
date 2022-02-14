import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Art } from './art.entity';

@Entity()
export class ArtFile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  artId: string;

  @ManyToOne(() => Art, (art) => art.files, { cascade: true })
  @JoinColumn()
  art: Art;

  @Column({ type: 'text' })
  originalPath: string;

  @Column({ type: 'text' })
  watermarkPath: string;

  @CreateDateColumn()
  uploadedAt: Date;
}
