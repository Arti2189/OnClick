//angular prebuild packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
//angular map module 
import { AgmCoreModule } from '@agm/core';
//packages for filter, pagination and soting
import { FlashMessageModule } from 'angular-flash-message';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
//user defined components
import { UserService } from "./user.service"; //import UserServices
import { AppComponent } from './app.component'; //import typescript file of AppComponent
import { appRoutes } from './routerConfig'; //import router configuration file
import { HeaderComponent } from './header/header.component'; //HeaderComponent include header of application page
import { FooterComponent } from './footer/footer.component'; //FooterComponent include footer of apllication page
import { BannerComponent } from './banner/banner.component'; //BannerComponent include banner of application page 
import { ListvlistComponent } from './listvlist/listvlist.component'; //ListvlistComponent include list view
import { DetailsComponent } from './details/details.component'; //DetailComponent include complete detail of listing
import { BlogComponent } from './blog/blog.component'; //BlogComponent include blog in application
import { BlogdetailsComponent } from './blogdetails/blogdetails.component'; //BlogdetailsComponent include review writing
import { ListgridComponent } from './listgrid/listgrid.component'; //Listgrid Component contains grid view of listing
import { ContactComponent } from './contact/contact.component'; //ContactComponent has contact us module

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
      apiKey: 'AIzaSyBxlHaX-MF1tQYJhjpk3w1aJwToJ2Di3BQ' //google map api key
    })
  ],
  providers: [
    UserService,
    { provide: APP_BASE_HREF, useValue: '/' } //Base href provide service in angular for browser display.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

