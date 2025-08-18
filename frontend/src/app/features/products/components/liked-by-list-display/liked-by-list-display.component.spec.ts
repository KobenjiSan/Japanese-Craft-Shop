import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedByListDisplayComponent } from './liked-by-list-display.component';

describe('LikedByListDisplayComponent', () => {
  let component: LikedByListDisplayComponent;
  let fixture: ComponentFixture<LikedByListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedByListDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedByListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
