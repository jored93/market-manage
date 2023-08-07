import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    /* console.log(this.tasks); */
    const apiKey = this.configService.apiKey;
    const dbname = this.configService.database.name;
    return `this is the apikey: ${apiKey} and this is the database name: ${dbname}`;
  }
}
