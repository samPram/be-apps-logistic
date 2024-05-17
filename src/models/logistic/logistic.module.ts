import { Module } from '@nestjs/common';
import { LogisticController } from './logistic.controller';
import { LogisticService } from './logistic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierEntity } from './entity/courier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourierEntity])],
  controllers: [LogisticController],
  providers: [LogisticService],
})
export class LogisticModule {}
