import httpService from '#services/http/http.service';

export class PostAPI {
  static getAllPost() {
    return httpService.get<any>('https://jsonplaceholder.typicode.com/todos');
  }
}
