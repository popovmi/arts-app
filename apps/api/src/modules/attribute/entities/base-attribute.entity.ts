import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class BaseAttribute {
  @PrimaryColumn({ type: 'text' })
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'integer' })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
