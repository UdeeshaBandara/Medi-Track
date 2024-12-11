import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDSHIFT_POOL',
      useFactory: async (configService: ConfigService) => {
        return new Pool({
          user: configService.get<string>('REDSHIFT_USER'),
          host: configService.get<string>('REDSHIFT_HOST'),
          database: configService.get<string>('REDSHIFT_DB'),
          password: configService.get<string>('REDSHIFT_PASSWORD'),
          port: parseInt(configService.get<string>('REDSHIFT_PORT'), 10)
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDSHIFT_POOL'],
})
export class RedshiftModule {}
