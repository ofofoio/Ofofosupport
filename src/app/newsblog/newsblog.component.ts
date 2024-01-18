import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from '../shared/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsblog',
  templateUrl: './newsblog.component.html',
  styleUrls: ['./newsblog.component.scss'],
})
export class NewsblogComponent {
  subscriptions: Subscription[] = [];
  newsId: any = null;
  news: any = {};

  urlShare: string = window.location.href;
  linkedInShare: string = 'https://www.linkedin.com/sharing/share-offsite/?url=';
  whatsappShare: string = 'https://api.whatsapp.com/send?text=';
  twitterShare: string = 'https://twitter.com/share?url=';
  instaShare: string = 'https://www.instagram.com/share?url=';
  facebookShare: string = 'https://www.facebook.com/sharer/sharer.php?u=';
  telegramShare: string = 'https://t.me/share/url?url=';

  constructor(
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async (params: any) => {
        if (params.newsId) {
          this.newsId = params.newsId;
          this.getNews();
        } else {
          this.router.navigateByUrl(``);
        }
      },
      error: (error: any) => {
        this.router.navigateByUrl(``);
      },
    });
  }

  getNews() {
    let body: any = '';
    if (this.newsId) {
      body = {
        id: this.newsId,
      };
    } else {
    }
    this.subscriptions.push(
      this.generalService.getNews(body).subscribe({
        next: async (res: any) => {
          this.news = res;
          console.log(res);
        },
        error: (error: any) => {},
      })
    );
  }

  redirect(action: string) {
    if (action === 'home') {
      window.open(`${environment.landingpageUrl}`, '_blank');
    } else if (action === 'news') {
      this.router.navigateByUrl(``);
    }
  }

  newsblog(){
    window.open(`${this.news.Link}`, '_blank');
  }

  share(action: string) {
    switch (action) {
      case 'linkedin': window.open(`${this.linkedInShare}${this.urlShare}`, "_blank");
        break;

      case 'whatsup': window.open(`${this.whatsappShare}${this.urlShare}`, "_blank");
        break;

      case 'twitter': window.open(`${this.twitterShare}${this.urlShare}`, "_blank");
        break;

      case 'insta': window.open(`${this.instaShare}${this.urlShare}`, "_blank");
        break;

      case 'facebook': window.open(`${this.twitterShare}${this.urlShare}`, "_blank");
        break;

      case 'telegram': window.open(`${this.instaShare}${this.urlShare}`, "_blank");
        break;

      case 'copy': navigator.clipboard.writeText(this.urlShare)
        .then(() => {});
        break;
    }
  }
}
