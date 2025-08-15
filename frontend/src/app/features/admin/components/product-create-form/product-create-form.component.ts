import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../shared/models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-product-create-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './product-create-form.component.html',
  styleUrl: './product-create-form.component.scss'
})
export class ProductCreateFormComponent {

  // Form building logic
  fb = inject(FormBuilder);

  createProductForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: [, Validators.required],
    images: [''],
    category: ['', Validators.required],
    isFeatured: [false, Validators.required],
    stock: [, Validators.required]
  });

  // Output & preview-card signal initialization
  exProduct = output<Product>();

  // Auto update signals on form input
  exTitle = toSignal(this.createProductForm.controls.title.valueChanges, {initialValue: this.createProductForm.controls.title.value});
  exPrice = toSignal(this.createProductForm.controls.price.valueChanges, {initialValue: this.createProductForm.controls.price.value});
  exCategory = toSignal(this.createProductForm.controls.category.valueChanges, {initialValue: this.createProductForm.controls.category.value});
  exImage = signal<string>('');

  // Auto create product as signals update
  outputProduct = computed(() => ({
      id: '',
      title: this.exTitle()!,
      description: '',
      price: this.exPrice()!,
      imageUrls: [this.exImage()!],
      category: this.exCategory()!,
      isFeatured: false,
      stock: 0,
      lastUpdated: new Date(),
      CreatedAt: new Date(),
  }));

  // Auto emit when outputProduct() updates
  forOutput = effect(() => this.exProduct.emit(this.outputProduct()));
  
  // Set Cateory
  markCategory(category: string){
    this.createProductForm.get('category')?.setValue(category);
  }

  // Set featured
  markFeatured(){
    this.createProductForm.get('isFeatured')?.setValue(!this.createProductForm.get('isFeatured')?.value);
  }

  // Images logic
  selectedImageFiles: File[] = [];
  imagePreviewUrls: string[] = [];

  onImageSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      Array.from(input.files).forEach(file => {
        this.selectedImageFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          this.imagePreviewUrls.push(url);
          if (!this.exImage()) this.exImage.set(url);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  resetForm(){
    this.createProductForm.reset();
    this.selectedImageFiles = [];
    this.imagePreviewUrls = [];
    this.exImage.set('');
  }

  adminService = inject(AdminService);

  onSubmit(){
    // validate form
    if(this.selectedImageFiles.length <= 0 || this.createProductForm.invalid) {
      console.error("Invalid form");
      return;
    } 

    const formValue = this.createProductForm.value;

    const formData = new FormData();
    formData.append('title', formValue.title!);
    formData.append('description', formValue.description!);
    formData.append('price', formValue.price!);
    this.selectedImageFiles.forEach(img => formData.append('images', img));
    formData.append('category', formValue.category!);
    formData.append('isFeatured', formValue.isFeatured!.toString());
    formData.append('stock', formValue.stock!);

    this.adminService.createProduct(formData).subscribe({
      next: (created) => {
        console.log('product created!! ', created);
        // TODO: add success message
        this.resetForm();
      },
      error: (err) => {
        // TODO: add error message
        console.error('error creating product', err);
      } 
    });
  }
}
