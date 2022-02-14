import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Art } from './art.entity';

@Entity()
export class ArtFile {
  @PrimaryColumn()
  artId: string;

  @ManyToOne(() => Art, (art) => art.files, { cascade: true, primary: true })
  @JoinColumn({ name: 'artId' })
  art: Art;

  @Column({ type: 'text' })
  originalPath: string;

  @Column({ type: 'text' })
  watermarkPath: string;

  @CreateDateColumn()
  uploadedAt: Date;
}
