import { lastValueFrom, Observable } from 'rxjs';

export const toPromise = <T>(
  observable$: Observable<T>,
  isThrowError?: boolean
) => {
  try {
    return lastValueFrom(observable$);
  } catch (error) {
    if (isThrowError) {
      throw error;
    }
    //Empty handle
  }
};
