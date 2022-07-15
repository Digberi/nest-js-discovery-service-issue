export const paramsDecoratorCreater = (symbol: string | symbol) =>
  function () {
    return function (
      target: object,
      propertyKey: string | symbol,
      parameterIndex: number,
    ) {
      const existingParameters: number[] =
        Reflect.getOwnMetadata(symbol, target, propertyKey) || [];
      existingParameters.push(parameterIndex);
      Reflect.defineMetadata(symbol, existingParameters, target, propertyKey);
    };
  };
