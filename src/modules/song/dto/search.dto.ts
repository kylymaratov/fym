import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchSongsDto {
  @ApiProperty({ type: String, description: 'Song text' })
  @IsNotEmpty()
  query: string;

  @ApiProperty({ type: Number, description: 'Find limit, default 20 songs' })
  limit: number = 20;

  @ApiProperty({
    type: String,
    description: 'Search songs by, default all',
    enum: ['title', 'author', 'all'],
  })
  search_by: 'title' | 'author' | 'all' = 'all';
}
