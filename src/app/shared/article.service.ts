import { Injectable } from '@angular/core';
import { ApiService, Url } from './api.service';
import { Article, ArticleFilter, ArticlesFilter, ArticlesFilterResult } from './model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiSvc: ApiService) { }

  getItems(filter: ArticleFilter, page: number, pageSize: number) {
    const param: ArticlesFilter = {
      filter: {
        ref: filter.ref,
        name: filter.name,
        price: filter.price? +filter.price: undefined,
        quantity: filter.quantity? +filter.quantity: undefined,
        articleTypeId: filter.articleTypeId? +filter.articleTypeId: undefined,
      },
      page: page,
      pageSize: pageSize
    }
    return this.apiSvc.post<ArticlesFilterResult>(Url.LIST, param);
  }

  getItem(id: number) {
    if (id !== 0) {
      return this.apiSvc.get<Article>(`${Url.GET}/${id}`);
    } else {
      console.log('Element with id = 0 not found');
      return null;
    }
  }

  saveItem(item: Article) {
    return this.apiSvc.post<boolean>(Url.EDIT, item);
  }

  deleteItem(id: number) {
    if (id !== 0) {
      return this.apiSvc.delete<boolean>(`${Url.DELETE}/${id}`);
    } else {
      console.log('Article with id = 0 cannot be deleted');
      return null;
    }
  }
}
