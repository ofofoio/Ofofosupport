import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsblogComponent } from './newsblog/newsblog.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  { path: '', component: SupportComponent },
  { path: 'news/:newsId', component: NewsblogComponent },
  { path: '**', redirectTo: '' }, // Redirect to the default route for any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
