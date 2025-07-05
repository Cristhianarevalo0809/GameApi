import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  players: string[];

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
}
