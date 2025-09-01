import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-admin-nav-column',
  imports: [],
  templateUrl: './admin-nav-column.component.html',
  styleUrl: './admin-nav-column.component.scss'
})
export class AdminNavColumnComponent {
  currentPage = signal<string>('products');

  currentPageOutput = output<string>();
  
  setCurrentPage(page: string){
    this.currentPage.set(page);
    this.currentPageOutput.emit(page);
  }
}
