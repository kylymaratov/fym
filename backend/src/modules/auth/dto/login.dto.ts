import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
  })
  password: string;
}
