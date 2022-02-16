import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseAttribute {
    static attributeType = undefined;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text', unique: true })
    name: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ type: 'integer', unique: true })
    valueOrder: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
