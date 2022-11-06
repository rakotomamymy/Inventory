import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../shared/article.service';
import { Article, ArticleFilter } from '../shared/model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  items: Article[] = [];

  itemsCount = 0;
  pageSize = 5;
  currentPage = 1;

  filter: ArticleFilter = {};

  constructor(private router: Router, private svc: ArticleService) { }

  ngOnInit(): void {
    this.updateData();
  }

  onPageChanged() {    
    this.updateData();
  }

  onSearch() {
    this.currentPage = 1;
    this.updateData();
  }

  updateData() {
    this.svc.getItems(this.filter, this.currentPage, this.pageSize).subscribe(res => {
      this.items = res.items;
      this.itemsCount = res.count;
    });    
  }

  view(id: number) {
    this.router.navigate(['view', id]);
  }

  edit(id: number) {
    this.router.navigate(['edit', id]);
  }

}
