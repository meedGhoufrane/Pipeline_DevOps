import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PharmaciesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pharmacy-db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
