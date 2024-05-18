import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courier')
export class CourierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 20, nullable: false })
  logistic_name: string;

  @Column('bigint', { nullable: false })
  amount: number;

  @Index('index_destination')
  @Column('varchar', { length: 50, nullable: false })
  destination_name: string;

  @Index('index_origin')
  @Column('varchar', { length: 50, nullable: false })
  origin_name: string;

  @Column('varchar', { length: 10, nullable: true })
  duration: string;
}
