import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { GamePlayer } from './game.player.entity';

@Table
export class Game extends Model {
  @ApiProperty({
    example: '1',
    description: 'id for user',
  })
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @ApiProperty({
    example: 'the best fiends',
    description: 'name party',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: '2',
    description: 'number of players',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxPlayers: number;

  @ApiProperty({
    example: 'shinta, ocean',
    description: 'joined succes!',
  })
  @ApiProperty({
    example: 'state',
    description: 'estate accept',
  })
  @Column({
    type: DataType.ENUM('waiting', 'in_progress', 'finished'),
    defaultValue: 'waiting',
  })
  state: string;

  @ApiProperty({
    example: 'score{"shinta": "10", "ocean":3}',
    description: 'score players',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  score: Record<string, number>;

  @BelongsToMany(() => User, () => GamePlayer)
  players: User[];
}
