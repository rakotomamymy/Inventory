import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ViewArticleComponent } from './articles/view-article/view-article.component';
import { AddEditArticleComponent } from './articles/add-edit-article/add-edit-article.component';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  { path: 'home', component: ArticlesComponent },
  { path: 'add', component: AddEditArticleComponent },
  { path: 'view/:id', component: ViewArticleComponent },
  { path: 'edit/:id', component: AddEditArticleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ArticlesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ViewArticleComponent,
    AddEditArticleComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
