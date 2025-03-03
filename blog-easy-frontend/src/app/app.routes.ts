import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ArticleListComponent} from './components/article-list/article-list.component';

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'articles',component:ArticleListComponent},
];
