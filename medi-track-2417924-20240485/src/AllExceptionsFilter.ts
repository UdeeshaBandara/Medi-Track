import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      this.logger.error(`Exception caught: ${exception instanceof Error ? exception.stack : exception}`);
      response
        .status(exception.getStatus())
        .json({
          statusCode: exception.getStatus(),
          timestamp: new Date().toISOString(),
          path: request.url,
          response: exception.getResponse()['message']
        });
    } else if (exception instanceof Error) {
      // Standard error handling
      this.logger.error(`Exception caught: Message: ${exception.message}, Stack: ${exception.stack}`);
    } else {
      // Generic fallback for unknown types
      this.logger.error(`Unknown exception caught: ${exception}`);
    }
  }
}
