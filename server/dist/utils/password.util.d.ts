export declare class PasswrodUtil {
    hashPassword(password: string, salt?: number): Promise<string>;
    matchPassword(password: string, hashedPassword: string): Promise<boolean>;
}
