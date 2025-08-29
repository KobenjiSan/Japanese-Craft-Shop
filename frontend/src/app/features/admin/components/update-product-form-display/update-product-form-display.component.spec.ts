import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductFormDisplayComponent } from './update-product-form-display.component';

describe('UpdateProductFormDisplayComponent', () => {
  let component: UpdateProductFormDisplayComponent;
  let fixture: ComponentFixture<UpdateProductFormDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductFormDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductFormDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
