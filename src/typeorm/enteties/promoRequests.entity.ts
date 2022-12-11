import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'promo_requests' })
export class PromoRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  request_date: Date;

  @Column()
  genre: string;

  @Column()
  song_src: string;
}
