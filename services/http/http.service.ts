import {
  HttpMethod,
  HttpOptions,
  ThrowErrorStrategy,
} from '#interfaces/http.interface';
import storageService from '#services/storage/storage.service';
import { ACCESS_TOKEN } from '#shared/const/app.const';
import axios, { AxiosRequestHeaders } from 'axios';
import { Observable, from, map, catchError, of } from 'rxjs';

export class HttpService {
  private commonHeader = {
    Accept: 'application/json',
    'Cache-Control': 'no-cache no-store',
    Pragma: 'no-cache',
    Expires: '0',
    'Access-Control-Allow-Origin': '*',
  };

  private instance = axios.create({
    timeout: 300000,
  });

  public get<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.GET, options);
  }

  public post<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.POST, options);
  }

  public put<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.PUT, options);
  }

  public delete<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.DELETE, options);
  }

  public request<T>(
    uri: string,
    method: HttpMethod,
    options?: HttpOptions
  ): Observable<T> {
    const url = this.resolve(uri);
    return from(
      this.instance.request<T>({
        url,
        method,
        data: options?.body,
        params: options?.queryParams,
        headers: this.generateHeader(options?.headers),
        signal: options?.signal,
      })
    ).pipe(
      map((response) => response.data),
      catchError((err) =>
        this.handleError(
          err,
          options?.throwError || ThrowErrorStrategy.NotThrow
        )
      )
    );
  }

  private generateHeader = (header?: AxiosRequestHeaders) => {
    const token = storageService.get(ACCESS_TOKEN);

    return {
      ...this.commonHeader,
      ...header,
      token: token || '',
    };
  };

  private handleError(error: any, throwErrorStrategy: ThrowErrorStrategy) {
    switch (throwErrorStrategy) {
      case ThrowErrorStrategy.ThrowOnly:
        throw error;
      case ThrowErrorStrategy.ThrowAndNotify:
        //TODO: handle toast
        throw error;
      default:
        return of();
    }
  }

  private resolve = (uri: string): string => {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }
    return `${process.env.API_URL}${uri}`;
  };
}

export default new HttpService();
