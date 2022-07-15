import { Logger } from '@nestjs/common';

export function Performance() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const logger = new Logger();
    const originalFunction = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = performance.now();
      const result = await originalFunction.apply(this, args);
      const finish = performance.now();
      logger.debug(
        `${propertyKey} took ${finish - start} ms`,
        this.constructor.name,
      );
      return result;
    };
  };
}
