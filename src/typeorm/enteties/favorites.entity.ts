import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  playlist_id: number;
}
