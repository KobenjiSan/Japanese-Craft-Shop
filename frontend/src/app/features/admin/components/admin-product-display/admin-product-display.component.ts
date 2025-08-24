import { Component, inject, signal, ViewChild } from '@angular/core';
import { ProductCreateFormComponent } from '../product-create-form/product-create-form.component';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { Product } from '../../../../shared/models/product.model';
import { ProductListDisplayComponent } from '../../../products/product-list-display/product-list-display.component';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { ProductCreateDisplayComponent } from "../product-create-display/product-create-display.component";
import { MostLikedProductCardComponent } from '../most-liked-product-card/most-liked-product-card.component';


@Component({
  selector: 'app-admin-product-display',
  imports: [
    ProductListDisplayComponent,
    PortalModule,
    ProductCreateDisplayComponent,
    MostLikedProductCardComponent,
],
  templateUrl: './admin-product-display.component.html',
  styleUrl: './admin-product-display.component.scss'
})
export class AdminProductDisplayComponent {
  overlay = inject(Overlay);
  @ViewChild(CdkPortal) portal!: CdkPortal;

  overlayRef: any = null;
  
  openModal(){
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      height: '90%',
      hasBackdrop: true
    });

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  createdRefreshTick = signal(0);

  onProductCreated(){
    this.createdRefreshTick.update(v => v + 1);
    this.overlayRef.detach();
  }

  closeWindow(){
    this.overlayRef.detach();
  }
}
