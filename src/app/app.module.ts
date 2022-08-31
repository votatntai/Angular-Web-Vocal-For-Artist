import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImageCropperModule } from 'ngx-image-cropper';
import { BarRatingModule } from "ngx-bar-rating";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ProfileComponent } from './main/profile/profile.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { FooterComponent } from './main/footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AvatarComponent } from './main/profile/avatar/avatar.component';
import { JobsComponent } from './main/jobs/jobs.component';
import { DetailComponent } from './main/jobs/detail/detail.component';
import { StatusPipe, FileStatusPipe } from './pipes/status.pipe';
import { SecondToHourPipe } from './pipes/time.pipe';
import { PendingComponent } from './main/jobs/pending/pending.component';
import { DoneComponent } from './main/jobs/done/done.component';
import { ProcessingComponent } from './main/jobs/processing/processing.component';
import { InvitingComponent } from './main/jobs/inviting/inviting.component';
import { BalanceComponent } from './main/balance/balance.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { VocalChartComponent } from './main/home/vocal-chart/vocal-chart.component';
import { ProjectChartComponent } from './main/home/project-chart/project-chart.component';
import { DiscoverComponent } from './main/discover/discover.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    HomeComponent,
    ProfileComponent,
    NavigationComponent,
    FooterComponent,
    ErrorComponent,
    ForgetPasswordComponent,
    AvatarComponent,
    JobsComponent,
    StatusPipe,
    FileStatusPipe,
    SecondToHourPipe,
    PendingComponent,
    DoneComponent,
    ProcessingComponent,
    InvitingComponent,
    BalanceComponent,
    VocalChartComponent,
    ProjectChartComponent,
    DetailComponent,
    DiscoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    NgApexchartsModule,
    BarRatingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    SecondToHourPipe,
    StatusPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
