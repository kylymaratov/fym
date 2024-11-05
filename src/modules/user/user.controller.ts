import { Controller } from '@nestjs/common';
import { serverEnv } from 'src/server/server.env';

@Controller(`/api/${serverEnv.sv}/user`)
export class UserController {}
