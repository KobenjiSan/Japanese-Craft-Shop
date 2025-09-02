import { Component, effect, inject, input, output, signal, ViewChild, viewChild } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { AdminService } from '../../../admin/admin.service';
import { LikedByListDisplayComponent } from '../liked-by-list-display/liked-by-list-display.component';
import { ToastrService } from 'ngx-toastr';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { UpdateProductFormDisplayComponent } from '../../../admin/components/update-product-form-display/update-product-form-display.component';

@Component({
  selector: 'app-product-mini-display',
  imports: [
    UpperCasePipe,
    DatePipe,
    LikedByListDisplayComponent,
    PortalModule,
    UpdateProductFormDisplayComponent,
  ],
  templateUrl: './product-mini-display.component.html',
  styleUrl: './product-mini-display.component.scss'
})
export class ProductMiniDisplayComponent {
  proInput = input<Product>();

  product = signal<Product>(this.proInput()!);

  loadEffect = effect(() => {
    this.proInput();
    this.product.set(this.proInput()!);
  });

  updateEffect = effect(() => {
    const cur = this.product();
    this.product.set(cur);
  });

  deleted = output();

  auth = inject(AuthService);
  adminService = inject(AdminService);
  toastr = inject(ToastrService);

  onDelete(){
    const product = this.product();
    if(!product) return;

    const confirm = window.confirm(`Are you sure you want to delete ${product.title}?`);
    if(!confirm) return;

    this.adminService.deleteProduct(product.id).subscribe({
      next: () => {
        this.toastr.success(`Deleted: ${this.product()?.title}`)
        this.deleted.emit();
      },
      error: (err) => {
        console.error(`Failed to delete ${product.title}.`, err);
      }
    });
  }

  onEdit(){
    this.openModal();
  }

  overlay = inject(Overlay);
  @ViewChild(CdkPortal) portal!: CdkPortal;

  overlayRef: any = null;

  openModal(){
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      height: '97%',
      hasBackdrop: true
    });

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  closeWindow(){
    this.overlayRef.detach();
  }

  updated = output();

  onProductUpdated(updated: Product){
    this.updated.emit();
    this.product.set(updated);
    this.overlayRef.detach();
  }
}
