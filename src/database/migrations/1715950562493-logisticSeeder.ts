import { CourierEntity } from 'src/models/logistic/entity/courier.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LogisticSeeder1715950562493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Dumm data
    await queryRunner.manager.getRepository(CourierEntity).save([
      {
        logistic_name: 'JNE',
        amount: 10000,
        destination_name: 'JAKARTA',
        origin_name: 'BANDUNG',
        duration: '2-4',
      },
      {
        logistic_name: 'J&T',
        amount: 10000,
        destination_name: 'JAKARTA',
        origin_name: 'SURABAYA',
        duration: '2-6',
      },
      {
        logistic_name: 'JNE',
        amount: 10000,
        destination_name: 'JAKARTA',
        origin_name: 'SEMARANG',
        duration: '2-5',
      },
      {
        logistic_name: 'JNE',
        amount: 10000,
        destination_name: 'JAKARTA',
        origin_name: 'YOGYAKARTA',
        duration: '2-5',
      },
      {
        logistic_name: 'JNE',
        amount: 10000,
        destination_name: 'JAKARTA',
        origin_name: 'SURABAYA',
        duration: '2-6',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback dumm data
    await queryRunner.manager.getRepository(CourierEntity).clear();
  }
}
