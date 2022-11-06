import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public route: ActivatedRoute) {}

  links = [
    { title: 'Accueil', fragment: 'home' },
    { title: 'Nouvel article', fragment: 'add' }
  ];
}
