import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const data = ctx.getData();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message =
        typeof response === 'string' ? response : JSON.stringify(response);
    } else if (
      exception &&
      exception.constructor &&
      exception.constructor.name === 'AmqpConnectionError'
    ) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'RabbitMQ connection error';
    } else if (
      exception &&
      exception.constructor &&
      exception.constructor.name === 'AmqpConnectionClosedError'
    ) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'RabbitMQ connection closed';
    } else if (
      exception &&
      exception.constructor &&
      exception.constructor.name === 'AmqpChannelError'
    ) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'RabbitMQ channel error';
    } else if (
      exception &&
      exception.constructor &&
      exception.constructor.name === 'AmqpQueueError'
    ) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'RabbitMQ queue error';
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: data?.url || '',
      message: message,
    };

    return new RpcException(errorResponse);
  }
}
