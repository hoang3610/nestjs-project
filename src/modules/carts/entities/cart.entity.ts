import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('gas_cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ unique: true })
    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    // @Column({ nullable: true })
    first_name?: string;

    // @Column({ nullable: true })
    @Column()
    last_name?: string;

    @Column()
    address?: string;

    // @Column({ default: true })
    @Column()
    isActive: boolean;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}