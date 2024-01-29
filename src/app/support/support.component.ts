import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from '../shared/services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

  subscriptions: Subscription[] = [];

  public categories: any = [
    {
      id: 1,
      name: "Introductions to the offerings",
      count: 0,
      image: "assets/images/offeringintro.svg"
    },
    {
      id: 2,
      name: "Azure Best Practices",
      count: 0,
      image: "assets/images/azurecategory.svg"
    },
    {
      id: 3,
      name: "AWS Best Practices",
      count: 0,
      image: "assets/images/awscategory.svg"
    },
    {
      id: 4,
      name: "Ofofo Seller Guide",
      count: 0,
      image: "assets/images/sellercategory.svg"
    },
    {
      id: 5,
      name: "Ofofo Buyer Guide",
      count: 0,
      image: "assets/images/buyercategory.svg"
    },
    {
      id: 6,
      name: "Cybersecurity Wiki",
      count: 0,
      image: "assets/images/cybersecurity.svg"
    },
  ];
  public articals: any = {};
  public articalcontent: any = {};
  dataFetch: boolean = false;
  ArticalFetch: boolean = false;
  contentFetch: boolean = false;

  placeholder: any = "assets/images/articalsdefault.svg"

  constructor(
    private generalService: GeneralService, 
    private router: Router) {}

  ngOnInit(): void {
    this.getSupport();
    // this.getArticals();
    this.getContents();
  }

  onKeyUp(value: any){
    console.log(value);
  }

  onKeyEnter(){
    console.log("hit");
  }

  getSupport() {
    this.subscriptions.push(
      this.generalService.getTopics().subscribe({
        next: async (res: any) => {
          res.topics.forEach((element: any) => {
            this.categories.forEach((category: any) => {
              if(category.name === element.title){
                category.description = element.description
                category.id = element.topicPageId
                category.count = element.articles
              }
            });
          });;
          this.dataFetch = true;
        },
        error: (error: any) => {},
      })
    );
  }

  getArticals() {
    this.subscriptions.push(
      this.generalService.getArticles("e93eea5d-d6ca-4873-98f0-553410eaa13d").subscribe({
        next: async (res: any) => {
          this.articals = res.topic;
          this.dataFetch = true;
          this.ArticalFetch = true;
        },
        error: (error: any) => {},
      })
    );
  }

  getContents() {
    this.subscriptions.push(
      this.generalService.getcontents("b056b80a-d5ec-4150-ad97-c2a44a908d0d").subscribe({
        next: async (res: any) => {
          this.articalcontent = res.result;
          this.dataFetch = true;
          this.ArticalFetch = false;
          this.contentFetch = true;
        },
        error: (error: any) => {},
      })
    );
  }

}
