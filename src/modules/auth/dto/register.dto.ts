import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
  })
  @IsByteLength(8, Infinity)
  password: string;
}
