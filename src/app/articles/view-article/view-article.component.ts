import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../../shared/article.service';
import { Article } from '../../shared/model';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  item$?: Observable<Article>;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private svc: ArticleService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam) {
        this.item$ = this.svc.getItem(+idParam);        
      } else {
        console.error('No route parameter provided');
        this.route.navigate(['home']);
      }
    });
  }

  edit(id: number) {
    if (id !== 0)
      this.route.navigate(['edit', id]);
    else
      console.log('Article with id = 0 cannot be modified');
  }

  delete(id: number) {
    this.svc.deleteItem(id)?.subscribe(r => {
      this.route.navigate(['home']);
    });
  }
}
