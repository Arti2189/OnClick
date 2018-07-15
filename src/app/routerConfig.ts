import {Routes} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { ListvlistComponent } from './listvlist/listvlist.component';
import { DetailsComponent } from './details/details.component';
import { BlogComponent } from './blog/blog.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { ListgridComponent } from './listgrid/listgrid.component';
export const appRoutes:Routes=[
    {
        path:'',
        component:BannerComponent
     },
    {
       path:'listvlist',
       component:ListvlistComponent
    },
    {
        path:'details/:id',
        component:DetailsComponent
    },
    {
        path:'banner',
        component:BannerComponent
    },
    {
        path:'blogdetails',
        component:BlogdetailsComponent
    },
    {
        path:'header',
        component:HeaderComponent
    },
    {
        path:'blog',
        component:BlogComponent
    },
    {
        path:'listgrid',
        component:ListgridComponent
    }
   
];