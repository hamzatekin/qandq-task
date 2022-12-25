import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: 'movify.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [__dirname + '/subscribers/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
});
