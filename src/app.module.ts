import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetroModule } from './metro/metro.module';

@Module({
  imports: [TypeOrmModule.forRoot(new AppService().getDatabaseConfig()), MetroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  