import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, name } =
          configService.database;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}/${name}?authSource=admin`,
          user,
          pass: password,
          name,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
