import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ListneSongGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
