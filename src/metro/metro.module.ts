import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetroController } from './metro.controller';
import { MetroService } from './metro.service';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';
import { Notification } from './entities/notification.entity';
import { Review } from './entities/review.entity';
import { Request } from './entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, Notification, Review, Request])],
  controllers: [MetroController],
  providers: [MetroService],
})
export class MetroModule {}
