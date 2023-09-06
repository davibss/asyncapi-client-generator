import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerationProgressComponent } from './components/generation-progress/generation-progress.component';
import { ChooseSpecComponent } from './pages/choose-spec/choose-spec.component';
import { ReviewCodeComponent } from './pages/review-code/review-code.component';
import { DownloadCodeComponent } from './pages/download-code/download-code.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EditorModule } from './editor/editor.module';

@NgModule({
  declarations: [
    AppComponent,
    GenerationProgressComponent,
    ChooseSpecComponent,
    ReviewCodeComponent,
    DownloadCodeComponent,
    HomeComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
