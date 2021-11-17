import { Injectable } from '@nestjs/common';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { User } from "./metro/entities/user.entity";
import { Event } from "./metro/entities/event.entity";

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
      entities: [ User, Event ],
      migrations: ["dist/migration/*.js"],
      cli: {
        migrationsDir: "migration"
      },    
      synchronize: false,
      
    };
  };
}
