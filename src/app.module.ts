import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

import { PharmaciesModule } from './pharmacies/pharmacies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
    }),
    DatabaseModule,
    
    PharmaciesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}   