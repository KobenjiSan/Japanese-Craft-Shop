import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-product-display',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './admin-product-display.component.html',
  styleUrl: './admin-product-display.component.scss'
})
export class AdminProductDisplayComponent {
  fb = inject(FormBuilder);

  selectedCategory = signal('');

  createProductForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: [, Validators.required],
    images: ['', Validators.required],
    category: ['', Validators.required],
    isFeatured: [false, Validators.required],
    stock: [, Validators.required]
  });

  onSubmit(){
    
  }

  markCategory(category: string){
    this.createProductForm.get('category')?.setValue(category);
  }

  markFeatured(){
    this.createProductForm.get('isFeatured')?.setValue(!this.createProductForm.get('isFeatured')?.value);
    console.log(this.createProductForm.get('isFeatured')?.value);
  }
}
