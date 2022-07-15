import { Nullable, Optional } from './types';

type AsyncFunction = (...args: any[]) => Promise<any>;

export const isNull = <Type>(value: Type): value is null => value === null;

export const isNotNull = <Type>(value: Nullable<Type>): value is Type =>
  !isNull(value);

export const isUndefined = <Type>(value: Type): value is undefined =>
  value === undefined;

export const isDefined = <Type>(
  value: Optional<Type>,
): value is Nullable<Type> => !isUndefined(value);

export const isExists = <Type>(value: Optional<Type>): value is Type =>
  isNotNull(value) && isDefined(value);

export const isNotExists = <Type>(
  value: Optional<Type>,
): value is null | undefined => isNull(value) || isUndefined(value);

export const isFunction = (
  value: (...args: any[]) => any,
): value is (...args: any[]) => any => {
  return typeof value === 'function';
};

export const isAsyncFunction = (func: any): func is AsyncFunction =>
  func.constructor.name === 'AsyncFunction';
