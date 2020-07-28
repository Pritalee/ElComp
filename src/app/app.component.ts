import { Component } from '@angular/core';
import { PgService } from './pg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[PgService]
})
export class AppComponent {
  title = 'app';
}
