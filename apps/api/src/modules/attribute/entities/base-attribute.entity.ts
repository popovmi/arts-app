import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class BaseAttribute {
  @PrimaryColumn({ primary: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'integer' })
  order: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
