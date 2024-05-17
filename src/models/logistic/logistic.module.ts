import { Module } from '@nestjs/common';
import { LogisticController } from './logistic.controller';
import { LogisticService } from './logistic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierEntity } from './entity/courier.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourierEntity]),
    ConfigModule,
    HttpModule,
  ],
  controllers: [LogisticController],
  providers: [LogisticService],
})
export class LogisticModule {}
