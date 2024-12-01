import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: "medi-track.cxqakioo45ed.us-east-2.rds.amazonaws.com",
        port: 3306,
        database: "medi-track",
        username: "admin",
        password: "Plusgo12#",
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
