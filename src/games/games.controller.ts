import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Game } from './entities/game.entity';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Create party', type: Game })
  @ApiResponse({
    status: 404,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Bad Request',
  })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch(':id/join')
  @ApiResponse({ status: 200, description: 'Join Player', type: Game })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  joinGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.joinGame(+id, updateGameDto);
  }

  @Patch(':id/start')
  @ApiResponse({ status: 200, description: 'Game start', type: Game })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  startGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.startGame(+id, updateGameDto);
  }
  @Patch(':id/end')
  @ApiResponse({ status: 200, description: 'Game finish', type: Game })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  endGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.endGame(+id, updateGameDto);
  }
}
