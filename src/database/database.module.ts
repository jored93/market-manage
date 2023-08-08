import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config';

const API_KEY = '1234567890';
const API_KEY_PROD = '1234567890';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database,
          password,
          port,
          /* ssl: {
            rejectUnauthorized: false, // This is important for self-signed certificates
          }, */
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
