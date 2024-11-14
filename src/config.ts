import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    connection: process.env.MONGO_CONNECTION,
    name: process.env.MONGO_DB_NAME,
  },
  amqp: {
    host: process.env.RABBITMQ_HOST,
    port: parseInt(process.env.RABBITMQ_PORT, 10),
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    connection: process.env.RABBITMQ_CONNECTION,
  },
}));
