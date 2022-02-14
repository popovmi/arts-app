import {
  ArtClass,
  BottomForm,
  Form,
  Height,
  NominalVolume,
  ProductionMethod,
  ProductType,
  RingType,
} from 'modules/attribute/entities';
import { Project } from 'modules/project/entity/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArtFile } from './art-file.entity';

@Entity()
export class Art {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  internal: boolean;

  @OneToMany(() => ArtFile, (file) => file.art)
  files: ArtFile[];

  @Index()
  @Column({ nullable: true })
  projectId: string;

  @Column({ nullable: true })
  bottomForm: string;

  @Column({ nullable: true })
  artClass: string;

  @Column({ nullable: true })
  form: string;

  @Column({ nullable: true })
  nominalVolume: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  productType: string;

  @Column({ nullable: true })
  productionMethod: string;

  @Column({ nullable: true })
  ringType: string;

  @ManyToOne(() => Project, (project) => project.arts, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
  project: Project;

  @ManyToOne(() => BottomForm, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'bottomForm', referencedColumnName: 'name' })
  bottomFormEntity: BottomForm;

  @ManyToOne(() => ArtClass, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artClass', referencedColumnName: 'name' })
  artClassEntity: ArtClass;

  @ManyToOne(() => Form, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'form', referencedColumnName: 'name' })
  formEntity: Form;

  @ManyToOne(() => NominalVolume, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'nominalVolume', referencedColumnName: 'name' })
  nominalVolumeEntity: NominalVolume;

  @ManyToOne(() => Height, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'height', referencedColumnName: 'name' })
  heightEntity: Height;

  @ManyToOne(() => ProductType, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productType', referencedColumnName: 'name' })
  productTypeEntity: ProductType;

  @ManyToOne(() => ProductionMethod, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productionMethod', referencedColumnName: 'name' })
  productionMethodEntity: ProductionMethod;

  @ManyToOne(() => RingType, (lookup) => lookup.name, {
    createForeignKeyConstraints: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'ringType', referencedColumnName: 'name' })
  ringTypeEntity: RingType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
