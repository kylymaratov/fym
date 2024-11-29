interface ServerEnv {
    env: NodeJS.ProcessEnv;
    isProd: boolean;
    sv: 'v1';
    db_url: string;
    db_host: string;
}
export declare const serverEnv: ServerEnv;
export {};
