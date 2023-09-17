import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerationProgressComponent } from './components/generation-progress/generation-progress.component';
import { ChooseSpecComponent } from './pages/choose-spec/choose-spec.component';
import { ReviewCodeComponent } from './pages/review-code/review-code.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EditorModule } from './editor/editor.module';
import { HttpClientModule } from '@angular/common/http';
import { GeneratorComponent } from './pages/generator/generator.component';
import { UploadSvgComponent } from './components/upload-svg/upload-svg.component';
import { FileIconComponent } from './components/file-icon/file-icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    GenerationProgressComponent,
    ChooseSpecComponent,
    ReviewCodeComponent,
    HomeComponent,
    LandingComponent,
    GeneratorComponent,
    UploadSvgComponent,
    FileIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
