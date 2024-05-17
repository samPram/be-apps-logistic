import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { PostgresConfigModule } from './config/database/config.module';
import { PostgresProviderModule } from './providers/database/provider.module';
import { LogisticModule } from './models/logistic/logistic.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresConfigModule,
    PostgresProviderModule,
    AuthModule,
    LogisticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
