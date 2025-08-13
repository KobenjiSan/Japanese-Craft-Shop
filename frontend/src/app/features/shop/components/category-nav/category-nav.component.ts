import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-category-nav',
  imports: [],
  templateUrl: './category-nav.component.html',
  styleUrl: './category-nav.component.scss'
})
export class CategoryNavComponent {
  category = output<string>();

  onSetCategory(category: string){
    this.category.emit(category);
  }
}
