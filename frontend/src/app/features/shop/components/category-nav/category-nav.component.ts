import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-category-nav',
  imports: [],
  templateUrl: './category-nav.component.html',
  styleUrl: './category-nav.component.scss'
})
export class CategoryNavComponent {
  curCat = signal<string>('');
  category = output<string>();

  onSetCategory(category: string){
    if(category == this.curCat()) category = '';
    this.category.emit(category);
    this.curCat.set(category);
  }
}
