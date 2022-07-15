import { createHash } from 'crypto';
export const getCacheKey = (...data: any[]): string => {
  return createHash('sha1').update(JSON.stringify(data)).digest('hex');
};
