import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDisplayComponent } from './featured-display.component';

describe('FeaturedDisplayComponent', () => {
  let component: FeaturedDisplayComponent;
  let fixture: ComponentFixture<FeaturedDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
