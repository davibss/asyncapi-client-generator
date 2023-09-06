import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseSpecComponent } from './pages/choose-spec/choose-spec.component';
import { ReviewCodeComponent } from './pages/review-code/review-code.component';
import { DownloadCodeComponent } from './pages/download-code/download-code.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'generation', 
    component: HomeComponent,
    children: [
      {
        path: 'asyncapispec', component: ChooseSpecComponent
      },
      {
        path: 'review', component: ReviewCodeComponent
      },
      {
        path: 'download', component: DownloadCodeComponent
      }  
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
