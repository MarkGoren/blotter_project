import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_promo_playlists' })
export class UserPromoPlaylists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  playlist_id: string;

  @Column()
  is_approved: boolean;

  @Column()
  song_src: string;
}
