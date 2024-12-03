import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') ?? process.env.MYSQL_HOST,
        port: configService.get<number>('DB_PORT') ?? 3306,
        database: configService.get<string>('DB_NAME') ?? process.env.MYSQL_DATABASE,
        username: configService.get<string>('DB_USER') ?? process.env.MYSQL_USERNAME,
        password: configService.get<string>('DB_PASSWORD') ?? process.env.MYSQL_PASSWORD,
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
