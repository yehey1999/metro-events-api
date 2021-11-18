import { Injectable } from '@nestjs/common';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { User } from "./metro/entities/user.entity";
import { Event } from "./metro/entities/event.entity";
import { Review } from './metro/entities/review.entity';
import { Request } from './metro/entities/request.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDatabaseConfig() {
    return this.getDevConfig();
  }

  private getDevConfig = (): PostgresConnectionOptions => {
    return {
      // url: 'postgres://vetuelzgfedned:54753fb7f1aa43958bc8c365e22c8e1696a6c2a0422ba80c87844513eb5dab7d@ec2-52-201-195-11.compute-1.amazonaws.com:5432/daqliam7j4b1vj',
      type: 'postgres',
      host: 'ec2-52-201-195-11.compute-1.amazonaws.com',
      port: 5432,
      username: 'vetuelzgfedned',
      password: '54753fb7f1aa43958bc8c365e22c8e1696a6c2a0422ba80c87844513eb5dab7d',
      database: 'daqliam7j4b1vj',
      entities: [ User, Event, Review, Request ],
      synchronize: true,
      // multipleStatements: true,
      migrations: ["dist/migration/*.js"],
      cli: {
        migrationsDir: "src/migration",
      },
      migrationsRun: true,
      extra: { 
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  };

  
}
