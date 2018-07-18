import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appRoutes} from './routerConfig';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {FlashMessageModule} from 'angular-flash-message';
import{Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {UserService} from "./user.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { ListvlistComponent } from './listvlist/listvlist.component';
import { DetailsComponent } from './details/details.component';
import { BlogComponent } from './blog/blog.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { ListgridComponent } from './listgrid/listgrid.component';
import { AgmCoreModule } from '@agm/core';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ListvlistComponent,
    DetailsComponent,
    BlogComponent,
    BlogdetailsComponent,
    ListgridComponent,
    ContactComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlashMessageModule,
    Ng2SearchPipeModule, //including into imports
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxlHaX-MF1tQYJhjpk3w1aJwToJ2Di3BQ'
    })
  ],
  providers: [
    UserService,
    { provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

