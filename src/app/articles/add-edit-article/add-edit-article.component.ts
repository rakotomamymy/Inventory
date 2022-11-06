import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleService } from '../../shared/article.service';
import { Article } from '../../shared/model';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {

  isSubmitted = false;

  id = 0;
  form: FormGroup<{
    ref: FormControl<string>,
    name: FormControl<string>,
    price: FormControl<string>,
    quantity: FormControl<string>,
    type: FormControl<string>
  }>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private svc: ArticleService) {
    this.form = new FormGroup({
      ref: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      quantity: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      type: new FormControl('', { nonNullable: true, validators: [Validators.required] })///Validation here doesn't work
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const paramId = params.get('id');
      if (paramId) {
        this.id = +paramId;
        this.svc.getItem(this.id)?.subscribe((article: Article) => {
          if (article) {
            this.form.setValue({
              ref: article.ref,
              name: article.name,
              price: ''+article.price,
              quantity: ''+article.quantity,
              type: ''+article.articleTypeId
            });
          } else {
            console.error('Article not found');
          }
        });        
      }
    });
  }

  save() {
    this.isSubmitted = true;

    if (!this.form.valid)
      return;

    const article: Article = {
      id: this.id,
      ref: this.form.value.ref ? this.form.value.ref: '',
      name: this.form.value.name ? this.form.value.name : '',
      price: this.form.value.price ? +this.form.value.price : 0,
      quantity: this.form.value.quantity ? +this.form.value.quantity : 0,
      articleTypeId: this.form.value.type ? +this.form.value.type : 0
    };
    this.svc.saveItem(article).subscribe(r => {
      this.router.navigate(['home']);
    });
  }

  delete() {
    this.svc.deleteItem(this.id)?.subscribe(r => {
      this.router.navigate(['home']);
    });
  }

}
