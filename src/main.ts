require("dotenv").config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*const options = new DocumentBuilder()
    .setTitle('even-hub')
    .setDescription('Event hub App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);*/
  app.enableCors()
  await app.listen(4000);

}
bootstrap();
