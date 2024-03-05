import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from '../shared/services/general.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as CryptoJS from "crypto-js";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

  subscriptions: Subscription[] = [];

  public categories: any = [
    {
      id: "e93eea5d-d6ca-4873-98f0-553410eaa13d",
      name: "Introductions to the offerings",
      count: 0,
      image: "assets/images/offeringintro.svg"
    },
    {
      id: "f93dd349-635a-4bbe-a697-c70bf7c649dc",
      name: "Azure Best Practices",
      count: 0,
      image: "assets/images/azurecategory.svg"
    },
    {
      id: "edda09e2-d212-4656-8125-ce8fb71cb647",
      name: "AWS Best Practices",
      count: 0,
      image: "assets/images/awscategory.svg"
    },
    {
      id: "542af340-39b3-42e1-af4c-7a1d75f22226",
      name: "Ofofo Seller Guide",
      count: 0,
      image: "assets/images/sellercategory.svg"
    },
    {
      id: "08ed776d-7cc4-4bae-8df9-1f7c3f5a890b",
      name: "Ofofo Buyer Guide",
      count: 0,
      image: "assets/images/buyercategory.svg"
    },
    {
      id: "f74ddd6d-e365-4e10-9438-0941d37f0723",
      name: "Cybersecurity Wiki",
      count: 0,
      image: "assets/images/cybersecurity.svg"
    },
  ];
  public categoriesData: any = [
    {
      id: "e93eea5d-d6ca-4873-98f0-553410eaa13d",
      name: "Introductions to the offerings",
      articals: [],
      searchedarticals: [],
      searchResult: []
    },
    {
      id: "f93dd349-635a-4bbe-a697-c70bf7c649dc",
      name: "Azure Best Practices",
      articals: [],
      searchedarticals: [],
      searchResult: []
    },
    {
      id: "edda09e2-d212-4656-8125-ce8fb71cb647",
      name: "AWS Best Practices",
      articals: [],
      searchedarticals: [],
      searchResult: []
    },
    {
      id: "542af340-39b3-42e1-af4c-7a1d75f22226",
      name: "Ofofo Seller Guide",
      articals: [],
      searchedarticals: [],
      searchResult: []
    },
    {
      id: "08ed776d-7cc4-4bae-8df9-1f7c3f5a890b",
      name: "Ofofo Buyer Guide",
      articals: [],
      searchedarticals: [],
      searchResult: []
    },
    {
      id: "f74ddd6d-e365-4e10-9438-0941d37f0723",
      name: "Cybersecurity Wiki",
      articals: [],
      searchedarticals: [],
      searchResult: []
    },
  ];
  public selectedarticals: any = [
    {
      contentPageId: "b056b80a-d5ec-4150-ad97-c2a44a908d0d",
      description: "This helps in understanding what MFA is and how it can help Small and medium businesses",
      title: "What is MFA?"
    },
    {
      contentPageId: "91bcc35f-812a-4b3a-84bd-149be67449f5",
      description: "This helps in understanding Email Authentication Protocol Security and things like SPF, DMARC, DKIM etc",
      title: "What is Email Authentication Protocol Security? "
    },
    {
      contentPageId: "666b4512-eac6-4af7-a8a3-3314910ad14d",
      description: "Read the article and you will know what the CIS AWS Foundations benchmark is, why it is important for your organization, and how to use it. ",
      title: "What is CIS AWS Foundations Benchmark?"
    },
    {
      contentPageId: "b950b451-2b10-4ea1-aff0-b84e6aa8e01e",
      description: "What is DevSecOps, Why DevSecOps is Important and How to Implement It",
      title: "What is DevSecOps?"
    },
    {
      contentPageId: "712dc172-9119-4b99-ac75-aed86a6fe0c3",
      description: "Penetration Testing 101: Types, Techniques and Tools‍",
      title: "What is Penetration Testing? "
    },
    {
      contentPageId: "22a256bf-5d6f-4772-ade1-b39bb039859e",
      description: "The Role of CISO in Small and Medium Businesses, How a Fractional CISO Can Assist You",
      title: "What is the role of fractional CISO in SMBs?"
    },
    {
      contentPageId: "3f656924-cd09-4a77-bcc1-f223f84a9b49",
      description: "Compliance Management Defined: The Importance of Compliance with Cybersecurity Requirements",
      title: "What is Compliance Management?"
    },
    {
      contentPageId: "c995d870-4cca-42a8-a8da-295377086328",
      description: "What is a Security Operations Center? Is it required for Small and medium businesses?",
      title: "What is Security Operations Center?"
    }
  ];
  public articals: any = {};
  public articalcontent: any = {};
  offeringsData: any[] = [];
  articleName: any = null;
  articleId: any = null;
  topicName: any = "introductions-to-the-offerings";
  topicId: any = "e93eea5d-d6ca-4873-98f0-553410eaa13d";
  dataFetch: boolean = false;
  ArticalFetch: boolean = false;
  contentFetch: boolean = false;
  searchFetch: boolean = false;
  initialSearchFetch: boolean = false;
  categoriesDataFetch: boolean = false;

  userRated: boolean = false;
  rating: any = null;

  searchQuery: string = "";

  placeholder: any = "assets/images/articalsdefault.svg"
  imgplaceholder = "assets/images/placeholder.png";


  constructor(
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meta: Meta
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async (params: any) => {
        if (params.articleName && params.articleId) {
          this.articleName = params.articleName;
          this.articleId = params.articleId;
          this.topicName = params.topicName;
          this.topicId = params.topicId;
          this.getContents();
        } else if (params.topicName && params.topicId) {
          this.topicName = params.topicName;
          this.topicId = params.topicId;
          this.getArticals();
        } else {
          this.activatedRoute.queryParams.subscribe({
            next: async (queryParams: any) => {
              if (queryParams.search) {
                this.searchQuery = queryParams.search
                this.searchFetch = true;
                this.initialSearchFetch = true;
                if (this.categoriesDataFetch) this.onKeyUp("", this.searchQuery);
                // this.getSupport();
              } else {
                this.getSupport();
              }
            },
            error: (error: any) => { },
          });
        }
      },
      error: (error: any) => { },
    });
    this.categoriesData.forEach((topic: any, i: any) => {
      this.subscriptions.push(
        this.generalService.getArticles(topic.id).subscribe({
          next: async (res: any) => {
            topic.articals = res.topic.articles;
            if (this.searchFetch && i === this.categoriesData.length - 1) {
              setTimeout(() => {
                this.onKeyUp("", this.searchQuery);
              }, 2000);
            }
            this.categoriesDataFetch = true;
            this.dataFetch = true;
          },
          error: (error: any) => { },
        })
      );
    });
  }

  scrollToSection(sectionId: any) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  postRating(rating: number) {
    this.subscriptions.push(
      this.generalService.postRating({ "rating": rating }).subscribe({
        next: async (res: any) => {
          if (res.response === "Rating uploaded successfully") {
            this.userRated = true;
            this.rating = rating;
          }
        },
        error: (error: any) => { },
      })
    );
  }

  navigationMenu(page: any) {
    switch (page) {
      case 'main': this.router.navigateByUrl(``);
        break;

      case 'topic': this.router.navigateByUrl(`${this.topicName}/${this.topicId}`);
        break;

      case 'refresh': window.location.reload();
        break;

      default: this.router.navigateByUrl(``);
    }
  }

  onKeyUp(event: any, value?: any) {
    if (value)
      this.searchQuery = value;
    else
      this.searchQuery = event.value;
    console.log(this.searchQuery, this.categoriesData);
    if (this.searchQuery !== "") {
      this.categoriesData.forEach((topics: any) => {
        topics.searchedarticals = [];
        if (this.initialSearchFetch) topics.searchResult = [];
        topics.articals.forEach((artical: any) => {
          if (artical.title.toLowerCase().includes(this.searchQuery) || artical.description.toLowerCase().includes(this.searchQuery)) {
            topics.searchedarticals.push(artical)
            if (this.initialSearchFetch) topics.searchResult.push(artical)
          }
        });
      });
    }
    console.log(this.categoriesData);
  }

  onKeyEnter() {
    console.log("hit");
    // this.router.navigate([`/?search=${this.searchQuery}`]);
    const navigationExtras: NavigationExtras = {
      replaceUrl: true // This ensures that the browser's history is replaced
    };
    this.router.navigateByUrl(`/?search=${this.searchQuery}`, navigationExtras);
  }

  openOffering(offering: any) {
    let offeringName = offering.offeringName
      .replace(/[^a-zA-Z]+/gi, " ")
      .trim();
    let pathname =
      offeringName.replaceAll(" ", "-") + "/" + offering.offeringId;
    window.open(`${environment.marketplaceUrl}/offering/${pathname}`, "_blank");
  }

  selectedtopic(index: number) {
    let path = this.categories[index].name.replace(/[^a-zA-Z]+/gi, " ").trim().replaceAll(" ", "-") + "/" + this.categories[index].id
    let url = this.router.serializeUrl(
      this.router.createUrlTree([`/${path}`])
    );
    window.open(url, '_blank');
  }

  selectedartical(article: any) {
    let path = this.topicName + "/" + this.topicId + "/" +
      article.title.replace(/[^a-zA-Z]+/gi, " ").trim().replaceAll(" ", "-") + "/" + article.contentPageId
    let url = this.router.serializeUrl(
      this.router.createUrlTree([`/${path}`])
    );
    window.open(url, '_blank');
  }

  getSupport() {
    this.subscriptions.push(
      this.generalService.getTopics().subscribe({
        next: async (res: any) => {
          res.topics.forEach((element: any) => {
            this.categories.forEach((category: any) => {
              if (category.id === element.topicPageId) {
                category.description = element.description
                category.id = element.topicPageId
                category.count = element.articles
              }
            });
          });
          this.dataFetch = true;
        },
        error: (error: any) => { },
      })
    );
  }

  getArticals() {
    this.subscriptions.push(
      this.generalService.getArticles(this.topicId).subscribe({
        next: async (res: any) => {
          this.articals = res.topic;
          this.meta.updateTag({ property: 'og:title', content: this.articals.title });
          this.meta.updateTag({ property: 'og:description', content: this.articals.description });
          this.meta.addTag({ property: 'author', content: "ofofo" });
          this.dataFetch = true;
          this.ArticalFetch = true;
        },
        error: (error: any) => { },
      })
    );
  }

  getContents() {
    this.subscriptions.push(
      this.generalService.getcontents(this.articleId).subscribe({
        next: async (res: any) => {
          this.articalcontent = res.result;
          this.meta.updateTag({ property: 'og:title', content: this.articalcontent.title });
          this.meta.updateTag({ property: 'og:description', content: this.articalcontent.description });
          this.meta.addTag({ property: 'author', content: this.articalcontent.parentItem });
          this.getOfferings();
          this.dataFetch = true;
          this.contentFetch = true;
        },
        error: (error: any) => { },
      })
    );
  }

  getOfferings() {
    this.subscriptions.push(
      this.generalService.getOfferings(this.articalcontent.title).subscribe({
        next: async (res: any) => {
          this.offeringsData = JSON.parse(JSON.stringify(res.offerings));
          this.offeringsData.forEach((offering) => {
            if (offering && offering.image && !offering.image.includes('https://')) {
              let offeringimage = CryptoJS.AES.decrypt(offering.image, "~oF||Of||O~").toString(CryptoJS.enc.Utf8);
              offering.image = offeringimage.replaceAll(/\\"/g, '');
            }
          });
        },
        error: (error: any) => { },
      })
    );
  }

}
