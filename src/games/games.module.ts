import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './entities/game.entity';
import { GamePlayer } from './entities/game.player.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  imports: [SequelizeModule.forFeature([Game, GamePlayer]), UserModule],
})
export class GamesModule {}
