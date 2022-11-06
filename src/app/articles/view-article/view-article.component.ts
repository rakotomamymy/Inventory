import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleService } from '../../shared/article.service';
import { Article } from '../../shared/model';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  item: Article = {
    id: 0,
    ref: '',
    name: '',
    price: 0,
    quantity: 0,
    articleTypeId: 0
  };

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private svc: ArticleService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam) {
        this.svc.getItem(+idParam)?.subscribe(foundItem => {
          if (foundItem)
            this.item = foundItem;
          else {
            console.error(`Article with id ${idParam} not found`);
            this.route.navigate(['home']);
          }
        });        
      } else {
        console.error('No route parameter provided');
        this.route.navigate(['home']);
      }
    });
  }

  edit() {
    if (this.item.id !== 0)
      this.route.navigate(['edit', this.item.id]);
    else
      console.log('Article with id = 0 cannot be modified');
  }

  delete() {
    this.svc.deleteItem(this.item.id)?.subscribe(r => {
      this.route.navigate(['home']);
    });
  }
}
