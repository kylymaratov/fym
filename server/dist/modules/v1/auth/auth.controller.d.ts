import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from 'src/database/entities/user/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    logoutUser(req: Request, res: Response): void;
    loginUser(req: Request, res: Response, user: UserEntity): Promise<Response<any, Record<string, any>>>;
    createUser(body: RegisterDto): Promise<{
        message: string;
    }>;
}
