import { Logger } from '@nestjs/common';

export function ErrorCatch({ message = null, description = false } = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const logger = new Logger();
    const originalFunction = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalFunction.apply(this, args);
      } catch (error) {
        const context = this.logger?.context
          ? `${this.logger?.context} ${propertyKey}`
          : `${this.constructor.name} ${propertyKey}`;
        if (description) {
          logger.error(error.message, error.stack);
        } else if (message) {
          logger.error(`${message}: ${error.message}`, context);
        } else {
          logger.error(`Catched error: ${error.message}`, context);
        }
      }
    };
  };
}
