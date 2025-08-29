import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product-form-display',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './update-product-form-display.component.html',
  styleUrl: './update-product-form-display.component.scss'
})
export class UpdateProductFormDisplayComponent {
  product = input<Product>();

  productUpdated= output<Product>();
  closeWindow = output();

  onCloseWindow(){
    this.closeWindow.emit();
  }

  // Form building logic
  fb = inject(FormBuilder);

  updateProductForm!: FormGroup;

  updateForm = effect(() => {
    this.product();

    this.updateProductForm = this.fb.group({
      title: [this.product()?.title ?? '', Validators.required],
      description: [this.product()?.description ?? '', Validators.required],
      price: [this.product()?.price ?? null, Validators.required],
      images: [''],
      category: [this.product()?.category ?? '', Validators.required],
      isFeatured: [this.product()?.isFeatured ?? false, Validators.required],
      stock: [this.product()?.stock ?? null, Validators.required]
    });

    this.imagePreviewUrls.set([...this.product()?.imageUrls ?? []]);
  });
  

  markCategory(category: string){
    this.updateProductForm.get('category')?.setValue(category);
  }

  // Set featured
  markFeatured(){
    this.updateProductForm.get('isFeatured')?.setValue(!this.updateProductForm.get('isFeatured')?.value);
  }

  // Images logic
  selectedImageFiles: Map<string, File> = new Map;  // Images added (that haven't been removed)
  removedImageUrls: string[] = [];                  // Exisiting images removed

  imagePreviewUrls = signal<string[]>([]);          // all current images

  onImageSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          this.imagePreviewUrls.update(arr => [...arr, url]);
          this.selectedImageFiles.set(url, file);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  adminService = inject(AdminService);

  toastr = inject(ToastrService);
  
  onSubmit(){
    if(this.imagePreviewUrls().length <= 0 || this.updateProductForm.invalid) {
      this.updateProductForm.markAllAsTouched();
      return;
    } 

    const updatedProduct = this.product();
    const formValue = this.updateProductForm.value;

    const formData = new FormData();
    updatedProduct!.title != formValue.title             ? formData.append('title', formValue.title)                      : null;
    updatedProduct!.description != formValue.description ? formData.append('description', formValue.description)          : null;
    updatedProduct!.price != formValue.price             ? formData.append('price', formValue.price)                      : null;
    updatedProduct!.category != formValue.category       ? formData.append('category', formValue.category)                : null;
    updatedProduct!.isFeatured != formValue.isFeatured   ? formData.append('isFeatured', formValue.isFeatured.toString()) : null;
    updatedProduct!.stock != formValue.stock             ? formData.append('stock', formValue.stock)                      : null;
    
    this.selectedImageFiles.forEach(file => formData.append('addImages', file));
    this.removedImageUrls.forEach(url => formData.append('removeImageUrls', url));

    // Testing
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    this.adminService.updateProduct(updatedProduct!.id, formData).subscribe({
      next: (updated) => {
        this.productUpdated.emit(updated);
      },
      error: (err) => {
        console.error('error updating product', err);
      } 
    });
  }

  isHoveringImg = signal<{toggle: boolean, index: number}>({toggle: false, index: 0});

  setImgHover(toggleVal: boolean, indexVal: number){
    this.isHoveringImg.set({toggle: toggleVal,index: indexVal });
  }

  removeImage(url: string){
    if(this.product()?.imageUrls.includes(url)){  // sets exisiting images for removal
      this.removedImageUrls.push(url);
    } else {                                      // removes new image files directly
      this.selectedImageFiles.delete(url);
    }
    this.imagePreviewUrls.update(arr => arr.filter(i => i !== url)); // remove from preview
  }
}
