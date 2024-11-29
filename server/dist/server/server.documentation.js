"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setServerDocumentaion = void 0;
const swagger_1 = require("@nestjs/swagger");
const setServerDocumentaion = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Songfiy API')
        .setDescription('Music streaming service, for free and without borders')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, documentFactory);
};
exports.setServerDocumentaion = setServerDocumentaion;
//# sourceMappingURL=server.documentation.js.map