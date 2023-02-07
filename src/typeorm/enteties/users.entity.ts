import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  is_sub: boolean;

  @Column({ nullable: true })
  last_submit: Date;

  @Column({ nullable: false, default: 0 })
  is_verified: boolean;
}
