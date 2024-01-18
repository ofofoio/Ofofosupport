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
      name: "Introduction to Offerings",
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
      name: "Seller Guide",
      count: 0,
      image: "assets/images/sellercategory.svg"
    },
    {
      id: 5,
      name: "Buyer Guide",
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

  constructor(
    private generalService: GeneralService, 
    private router: Router) {}

  ngOnInit(): void {
    this.getSupport();
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
          console.log(res);
        },
        error: (error: any) => {},
      })
    );
  }

}
