export declare class TokenUtil {
    getToken(data?: any, exp?: string | number): Promise<string>;
    decodeToken<T>(token: string): Promise<T | null>;
}
