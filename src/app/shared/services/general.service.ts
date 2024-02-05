import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    public http: HttpClient,
    public constantService: ConstantService,
  ) { }

  getCategoriess() {
    return this.http.get(
      this.constantService.getBuyerUrl(
        `/api/v1/aether-free-api/categories/offeringcount`
      )
    );
  }

  getOfferings(searchTerm: string) {
    return this.http.get(
      this.constantService.getBuyerUrl(
        `/api/v1/aether-free-api/offerings?searchTerm=${searchTerm}&size=3&page=1`
      )
    );
  }

  getTopics() {
    return this.http.get(
      this.constantService.getUrl(
        `/api/v1/aether-free-api/notion/supportPage/topics`
      )
    );
  }

  getArticles(id: any) {
    return this.http.get(
      this.constantService.getUrl(
        `/api/v1/aether-free-api/notion/supportPage/articles/${id}`
      )
    );
  }

  getcontents(id: any) {
    return this.http.get(
      this.constantService.getUrl(
        `/api/v1/aether-free-api/notion/supportPage/article/content/${id}`
      )
    );
  }

  postRating(body: any) {
    return this.http.post(
      this.constantService.getUrl(
        `/api/v1/aether-free-api/suppportpage/rating`
      ),body
    );
  }

  getNews(body: any) {
    return this.http.post('https://hfvyjgjkussryrfqmpxaokmeia0thgkh.lambda-url.us-east-1.on.aws',body);
  }

}
