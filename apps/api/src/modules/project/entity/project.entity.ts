import { Art } from 'modules/art/entity/art.entity';
import { DropNumber, Intercenter, Sfm } from 'modules/attribute/entities';
import { Customer } from 'modules/customer/entities/customer.entity';
import { Factory } from 'modules/factory/entities/factory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  internal: boolean;

  @Column({ type: 'boolean', default: false })
  hasDesignDoc: boolean;

  @Column({ nullable: true })
  sfm: string;

  @Column({ nullable: true })
  dropNumber: string;

  @Column({ nullable: true })
  intercenter: string;

  @OneToMany(() => Art, (art) => art.project)
  arts: Art[];

  @Column({ nullable: true })
  factoryId: number;

  @Column({ nullable: true })
  customerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Sfm, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'name' })
  sfmEntity: Sfm;

  @ManyToOne(() => DropNumber, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'name' })
  dropNumberEntity: DropNumber;

  @ManyToOne(() => Intercenter, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'name' })
  intercenterEntity: Intercenter;

  @ManyToOne(() => Factory, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  factory: Factory;

  @ManyToOne(() => Customer, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  customer: Customer;
}
