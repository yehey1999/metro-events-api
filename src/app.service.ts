import { Injectable } from '@nestjs/common';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { User } from "./metro/entities/user.entity";
import { Event } from "./metro/entities/event.entity";
import { Notification } from './metro/entities/notification.entity';
import { Review } from './metro/entities/review.entity';
import { Request } from './metro/entities/request.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDatabaseConfig() {
    return this.getDevConfig();
  }

  private getDevConfig = (): SqliteConnectionOptions => {
    return {
      type: 'sqlite',
      database: 'metro-event-db',
      entities: [ User, Event, Notification, Review, Request ],
      migrations: ["dist/migration/*.js"],
      cli: {
        migrationsDir: "migration"
      },    
      synchronize: false,
      
    };
  };
}
