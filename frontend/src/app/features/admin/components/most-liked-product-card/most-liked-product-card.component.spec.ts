import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikedProductCardComponent } from './most-liked-product-card.component';

describe('MostLikedProductCardComponent', () => {
  let component: MostLikedProductCardComponent;
  let fixture: ComponentFixture<MostLikedProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostLikedProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostLikedProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
