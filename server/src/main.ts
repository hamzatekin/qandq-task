import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerDocument } from './const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(SwaggerDocument.title)
    .setDescription(SwaggerDocument.description)
    .setVersion(SwaggerDocument.version)
    .addTag(SwaggerDocument.tags[0].name, SwaggerDocument.tags[0].description)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SwaggerDocument.api, app, document);

  await app.listen(3000);
}
bootstrap();
