import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { envs } from './config/envs';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    GamesModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: envs.DATABASE_HOST,
      port: envs.DATABASE_PORT,
      username: envs.DATABASE_USERNAME,
      password: envs.DATABASE_PASSWORD,
      database: envs.DATABASE_NAME,
      // sync: { force: true },
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
