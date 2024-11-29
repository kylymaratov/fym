"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const server_env_1 = require("./server/server.env");
const server_cors_1 = require("./server/server.cors");
const server_session_1 = require("./server/server.session");
const server_passport_1 = require("./server/server.passport");
const common_1 = require("@nestjs/common");
const server_exception_1 = require("./server/server.exception");
const server_documentation_1 = require("./server/server.documentation");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new server_exception_1.HttpExceptionFilter());
    (0, server_cors_1.setServerCors)(app);
    (0, server_session_1.setServerSession)(app);
    (0, server_passport_1.setServerPassport)(app);
    (0, server_documentation_1.setServerDocumentaion)(app);
    await app.listen(server_env_1.serverEnv.isProd ? 5000 : 5001);
}
bootstrap();
//# sourceMappingURL=main.js.map