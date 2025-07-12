import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateGameDto, GameState } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GamesService {
  private readonly logger = new Logger('GamesService');

  constructor(
    @InjectModel(Game)
    private gameModel: typeof Game,
    private readonly userService: UserService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const { name, maxPlayers, userId, state } = createGameDto;

    try {
      const newGame = await this.gameModel.create({
        name: name,
        maxPlayers: maxPlayers,
        state: state || 'waiting',
        score: null,
      });

      if (userId) {
        const user = await this.userService.findOne(userId);
        await newGame.$add('players', user);
      }

      return newGame;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(id: number) {
    const game = await this.gameModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          as: 'players',
          attributes: ['id', 'fullname', 'email'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!game) {
      throw new BadRequestException(`Game with id: ${id} not found`);
    }
    return game;
  }

  async joinGame(gameId: number, updateGameDto: UpdateGameDto) {
    const { userId } = updateGameDto;

    if (!userId)
      throw new BadRequestException('User ID is required to join the game');

    const game = await this.findOne(gameId);
    if (game.dataValues.state !== GameState.WAITING)
      throw new BadRequestException('Game is not joinable');

    const user = await this.userService.findOne(userId);

    const alreadyJoined = game.dataValues.players.find(
      (player) => player.id === userId,
    );
    if (alreadyJoined)
      throw new BadRequestException('User already joined the game');

    if (game.dataValues.players.length >= game.maxPlayers)
      throw new BadRequestException('Game is full');

    await game.$add('players', user);

    return {
      message: `User ${user.dataValues.fullname} has joined the game ${game.dataValues.name}`,
    };
  }

  async startGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);

    try {
      await game.update({
        state: GameState.IN_PROFRESS,
      });
      return {
        message: 'The game has been started',
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async endGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);

    try {
      await game.update({
        score: updateGameDto.score,
        state: GameState.FINISHED,
      });

      return {
        message: 'Game finished',
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.parent?.code === '23505') {
      throw new BadRequestException(error.parent.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Something went very wrong!');
  }
}
