// import 'reflect-metadata'; // QUAN TRỌNG: Phải có dòng này đầu tiên
// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AppModule } from './app.module';
// import { ResponseInterceptor } from './common/interceptors/response.interceptor';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const configService = app.get(ConfigService);

//   // Global prefix
//   // const apiPrefix = configService.get<string>('apiPrefix') || 'api/v1';
//   app.setGlobalPrefix('api/v1');

//   // Global pipes
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,
//     forbidNonWhitelisted: true,
//     transform: true,
//   }));

//   // Global interceptors
//   app.useGlobalInterceptors(new ResponseInterceptor());

//   // Global filters
//   app.useGlobalFilters(new HttpExceptionFilter());

//   // CORS
//   app.enableCors();

//   const port = configService.get<number>('port') || 3000;
//   await app.listen(port);
  
//   console.log(`Application is running on: http://localhost:${port}`);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global prefix
  app.setGlobalPrefix('api/v1');
  
  // CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();